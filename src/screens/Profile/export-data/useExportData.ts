import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainNavigatorType} from '../../../navigation/type';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TransactionData, TransactionReducerType} from '../../../interface';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {ShowTostMessage} from '../../../utils';
import {PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import FileViewer from 'react-native-file-viewer';

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
    let totalIncome = 0;
    let totalExpense = 0;

    const rows = filteredData
      .map(transaction => {
        let debit = '';
        let credit = '';
        let rowClass = '';

        if (transaction.transaction_mode === 'income') {
          credit = transaction.transaction_amount.toFixed(2);
          totalIncome += transaction.transaction_amount;
          balance += transaction.transaction_amount;
          rowClass = 'income';
        } else {
          debit = transaction.transaction_amount.toFixed(2);
          totalExpense += transaction.transaction_amount;
          balance -= transaction.transaction_amount;
          rowClass = 'expense';
        }

        return `
        <tr class="${rowClass}">
          <td>${
            transaction.timestamp
              ? new Date(transaction.timestamp).toLocaleDateString()
              : ''
          }</td>
          <td>${
            transaction.transaction_note ??
            transaction.transaction_category?.name ??
            ''
          }</td>
          <td class="debit">${debit}</td>
          <td class="credit">${credit}</td>
          <td class="balance">${balance.toFixed(2)} Cr</td>
        </tr>
      `;
      })
      .join('');

    // Total rows
    const totalRow = `
      <tr>
        <td colspan="2">Total Income</td>
        <td colspan="3" class="right-align">${totalIncome.toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="2">Total Expense</td>
        <td colspan="3" class="right-align">${totalExpense.toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="2">Remaining Balance</td>
        <td colspan="3" class="right-align">${balance.toFixed(2)}</td>
      </tr>
    `;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: right;
            }
            th {
              background-color: #f2f2f2;
            }
            .debit {
              color: red;
            }
            .credit {
              color: green;
            }
            .right-align {
              text-align: right;
            }
          </style>
        </head>
        <body>
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
              ${totalRow}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  const requestStoragePermission = async (callback: (res: boolean) => void) => {
    try {
      const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
      const result = await check(permission);
      console.log('result----------', result);
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(permission);
        if (requestResult !== RESULTS.GRANTED) {
          openSettings();
        }
      } else {
        callback(true);
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
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
      if (Platform.OS === 'android') {
        requestStoragePermission(res => {
          if (res) {
            downloadPDF(file.filePath);
          }
        });
      } else {
        downloadPDF(file.filePath);
      }
    }
  };

  const downloadPDF = async (sourceFilePath: any) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
    const fileName = `TransactionReport-${formattedDate}.pdf`;
    if (Platform.OS === 'android') {
      const destinationPath = RNFS.DownloadDirectoryPath + `/${fileName}`;
      try {
        await RNFS.copyFile(sourceFilePath, destinationPath);
        ShowTostMessage('File Download Successfully', 'success');
      } catch (error) {
        ShowTostMessage('Tried Again', 'error');
      }
    } else {
      const destinationPath = RNFS.DocumentDirectoryPath + `/${fileName}`;
      RNFS.downloadFile({
        fromUrl: `file://${sourceFilePath}`,
        toFile: destinationPath,
      })
        .promise.then(response => {
          if (Platform.OS === 'ios') {
            const filePath = `file://${sourceFilePath}`;
            let options = {
              type: 'application/pdf',
              url: filePath,
              saveToFiles: true,
            };
            Share.open(options)
              .then(resp => {
                ShowTostMessage('File Download Successfully', 'success');
                FileViewer.open(filePath);
              })
              .catch(err => {
                ShowTostMessage('Tried Again', 'error');
              });
          }
        })
        .catch(err => {
          console.log('err----------', err);
        });
    }
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
