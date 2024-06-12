import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainNavigatorType, RootPage} from '../../../navigation/type';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TransactionData, TransactionReducerType} from '../../../interface';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {ShowTostMessage} from '../../../utils';
import {Alert, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage';
import {FirebaseStoragePDF} from '../../../hooks';

export const useExportData = () => {
  const {transactionData} = useSelector(
    (state: {transactionReducer: TransactionReducerType}) =>
      state?.transactionReducer,
  );
  const navigation = useNavigation<NavigationProp<MainNavigatorType>>();
  const [selectedData, setSelectedData] = useState({
    name: '',
    value: '',
  });
  const [selectedDate, setSelectedDate] = useState({
    name: '',
    value: '',
  });
  const [filteredData, setFilteredData] = useState<TransactionData[]>([]);

  const onBackPress = () => {
    navigation.goBack();
  };

  const onDateChange = (item: any) => {
    setSelectedDate({
      value: item.value,
      name: item.name,
    });
  };

  const onDataChange = (item: any) => {
    setSelectedData({
      value: item.value,
      name: item.name,
    });
  };

  useEffect(() => {
    const filterData = () => {
      let newData = transactionData;

      if (selectedData.value && selectedData.value.toLowerCase() !== '1') {
        newData = newData.filter(
          item =>
            item.transaction_mode.toLowerCase() ===
            selectedData.name.toLowerCase(),
        );
      }

      if (selectedDate.value) {
        const today = new Date();
        let startDate: Date;

        switch (selectedDate.name.toLowerCase()) {
          case 'last 30 days':
            startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
          case 'last 3 months':
            startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
            break;
          case 'last 6 months':
            startDate = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000);
            break;
          case 'last year':
            startDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
            break;
          default:
            startDate = today;
            break;
        }

        newData = newData.filter(
          item => new Date(item.transaction_createdAt) >= startDate,
        );
      }
      setFilteredData(newData);
    };

    filterData();
  }, [selectedData, selectedDate, transactionData]);

  const generateHtml = () => {
    let balance = 0;

    const rows = filteredData
      .map(transaction => {
        let debit = '';
        let credit = '';

        if (transaction.transaction_mode === 'income') {
          credit = transaction.transaction_amount.toFixed(2);
          balance += transaction.transaction_amount;
        } else {
          debit = transaction.transaction_amount.toFixed(2);
          balance -= transaction.transaction_amount;
        }

        return `
        <tr>
          <td>${new Date(transaction.timestamp).toLocaleDateString()}</td>
          <td>${
            transaction.transaction_note ||
            transaction.transaction_category.name
          }</td>
          <td class="debit">${debit}</td>
          <td class="credit">${credit}</td>
          <td class="balance">${balance.toFixed(2)} Cr</td>
        </tr>
      `;
      })
      .join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: 'Helvetica';
                  font-size: 12px;
                  margin: 0;
                  padding: 0;
              }
              header, footer {
                  height: 50px;
                  background-color: #fff;
                  color: #000;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0 20px;
                  border-bottom: 1px solid #000;
              }
              footer {
                  border-top: 1px solid #000;
                  border-bottom: none;
              }
              table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
              }
              th, td {
                  border: 1px solid #000;
                  padding: 8px;
                  text-align: right;
              }
              th {
                  background-color: #f2f2f2;
                  text-align: center;
              }
              td:first-child {
                  text-align: left;
              }
              .credit {
                  color: green;
              }
              .debit {
                  color: red;
              }
              .balance {
                  color: blue;
              }
              .right-align {
                  text-align: right;
              }
              .center-align {
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <header>
              <h1>Transaction Report</h1>
              <div>
                  <p>Expense Tracker</p>
              </div>
          </header>
          <main>
              <h2>Transactions</h2>
              <table>
                  <thead>
                      <tr>
                          <th>Date</th>
                          <th>Details</th>
                          <th>Debit(-)</th>
                          <th>Credit(+)</th>
                          <th>Balance</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${rows}
                  </tbody>
              </table>
          </main>
          <footer>
              <p>Thank you for your business!</p>
          </footer>
      </body>
      </html>
    `;
  };

  const onExportPress = async () => {
    if (selectedDate.name === '' || selectedData.name === '') {
      ShowTostMessage('Please Select data', 'error');
    } else {
      const htmlContent = generateHtml();
      let options = {
        html: htmlContent,
        fileName: 'TransactionReport',
        directory: 'Documents',
        base64: true,
      };
      const file = await RNHTMLtoPDF.convert(options);
      downloadPDF(file.filePath);
    }
  };

  const downloadPDF = async (sourceFilePath: any) => {
    FirebaseStoragePDF(sourceFilePath, res => {
      console.log('res----------', res);
      const destinationPath = RNFS.DocumentDirectoryPath + '/example.pdf';
      console.log('destinationPath----------', destinationPath);
      RNFS.downloadFile({
        fromUrl: res,
        toFile: destinationPath,
        background: true, // Enable downloading in the background (iOS only)
        discretionary: true, // Allow the OS to control the timing and speed (iOS only)
        progress: res => {
          // Handle download progress updates if needed
          const progress = (res.bytesWritten / res.contentLength) * 100;
          console.log(`Progress: ${progress.toFixed(2)}%`);
        },
      })
        .promise.then(response => {
          console.log('File downloaded!', response);
        })
        .catch(err => {
          console.log('Download error:', err);
        });
    });
    // const docPath = sourceFilePath;
    // const docName = 'transaction.pdf';
    // const reference = storage().ref();
    // const task = reference.child('/invoices/' + docName).putFile(docPath);
    // task?.on('state_changed', async onSnap => {
    //   const imageUrl = await storage()
    //     .ref(onSnap?.ref?.fullPath)
    //     .getDownloadURL();
    //   console.log('imageUrl----------', imageUrl);
    // });
    // const destinationPath = RNFS.DocumentDirectoryPath + '/example.pdf';
    // const storageRef = storage().ref();
    // const tempFilePath = `${RNFS.TemporaryDirectoryPath}/${sourceFilePath}`;
    // await storageRef.writeToFile(tempFilePath);

    // RNFS.downloadFile({
    //   fromUrl: 'file://' + sourceFilePath,
    //   toFile: destinationPath,
    //   background: true, // Enable downloading in the background (iOS only)
    //   discretionary: true, // Allow the OS to control the timing and speed (iOS only)
    //   progress: res => {
    //     // Handle download progress updates if needed
    //     const progress = (res.bytesWritten / res.contentLength) * 100;
    //     console.log(`Progress: ${progress.toFixed(2)}%`);
    //   },
    // })
    //   .promise.then(response => {
    //     console.log('File downloaded!', response);
    //   })
    //   .catch(err => {
    //     console.log('Download error:', err);
    //   });
  };

  return {
    onBackPress,
    selectedData,
    selectedDate,
    onDateChange,
    onDataChange,
    onExportPress,
  };
};
