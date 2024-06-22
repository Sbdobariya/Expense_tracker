import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainNavigatorType} from '../../../navigation/type';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TransactionData, TransactionReducerType} from '../../../interface';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {ShowTostMessage} from '../../../utils';
import Share from 'react-native-share';
import {DateType} from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

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
  const [filteredData, setFilteredData] = useState<TransactionData[]>([]);
  const [isCalenderModalVisible, setIsCalenderModalVisible] = useState(false);
  const [range, setRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({startDate: undefined, endDate: undefined});

  const onBackPress = () => {
    navigation.goBack();
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

      if (range.startDate && range.endDate) {
        const startDate = dayjs(range.startDate).toDate();
        const endDate = dayjs(range.endDate).toDate();

        newData = newData.filter(item => {
          const transactionDate = new Date(item.transaction_createdAt);
          return transactionDate >= startDate && transactionDate <= endDate;
        });
      }

      setFilteredData(newData);
    };

    filterData();
  }, [selectedData, range, transactionData]);

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

  const onExportPress = async () => {
    if (range.endDate === '' || selectedData.name === '') {
      ShowTostMessage('Please Select data', 'error');
    } else {
      const htmlContent = generateHtml();
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;
      const fileName = `TransactionReport-${formattedDate}`;
      let options = {
        html: htmlContent,
        fileName: fileName,
        directory: 'Documents',
        base64: true,
      };
      const file = await RNHTMLtoPDF.convert(options);
      downloadPDF(file.filePath);
    }
  };

  const downloadPDF = async (sourceFilePath: any) => {
    const filePath = `file://${sourceFilePath}`;
    let options = {
      type: 'application/pdf',
      url: filePath,
      saveToFiles: true,
    };
    Share.open(options)
      .then(resp => {
        ShowTostMessage('File Download Successfully', 'success');
      })
      .catch(err => {});
  };

  const toggleModal = () => {
    setIsCalenderModalVisible(false);
  };
  const onDateSelect = () => {
    setIsCalenderModalVisible(true);
  };

  return {
    onBackPress,
    selectedData,
    onDataChange,
    onExportPress,
    toggleModal,
    onDateSelect,
    range,
    setRange,
    isCalenderModalVisible,
  };
};
