import {View} from 'react-native';
import React, {useState} from 'react';
import {
  CommonHeader,
  CustomStatusBar,
  ExportDataDropDown,
  PrimaryButton,
} from '../../../components';
import {ColorConst, hp} from '../../../theme';
import {useExportData} from './useExportData';
import {ExportDataType, TimeDuration} from '../../../constants/StaticData';
import {styles} from './ExportDataScreenStyle';

const ExportDataScreen: React.FC = () => {
  const {
    onBackPress,
    onDateChange,
    onDataChange,
    selectedData,
    selectedDate,
    onExportPress,
  } = useExportData();

  const transactions = [
    {
      timestamp: '2024-06-03T15:45:38.135Z',
      transaction_account: {id: 2, image: 64, name: 'Credit / Debit Card'},
      transaction_amount: 500,
      transaction_category: {id: 14, image: 35, name: 'Sport'},
      transaction_createdAt: '2024-06-03',
      transaction_id: 'X5ATz66Al58YY1KXbDkN',
      transaction_invoice: '',
      transaction_mode: 'expense',
      transaction_note: 'Nasto',
    },
    {
      timestamp: '2024-06-02T04:38:55.332Z',
      transaction_account: {id: 3, image: 58, name: 'UPI / Net Banking'},
      transaction_amount: 300,
      transaction_category: {id: 5, image: 29, name: 'Salary'},
      transaction_createdAt: '2024-06-02',
      transaction_id: 'nCLjWR8rXSetjNHG0UhE',
      transaction_invoice: '',
      transaction_mode: 'income',
      transaction_note: 'fad',
    },
    {
      timestamp: '2024-06-02T13:33:16.074Z',
      transaction_account: {id: 2, image: 62, name: 'Credit / Debit Card'},
      transaction_amount: 500,
      transaction_category: {id: 6, image: 25, name: 'Other'},
      transaction_createdAt: '2024-06-02',
      transaction_id: 'mYSnP5Pai6O9eQpYvz4I',
      transaction_invoice: '',
      transaction_mode: 'income',
      transaction_note: 'Smit',
    },
    {
      timestamp: '2024-06-02T04:38:42.997Z',
      transaction_account: {id: 2, image: 60, name: 'Credit / Debit Card'},
      transaction_amount: 200,
      transaction_category: {id: 2, image: 37, name: 'Beauty'},
      transaction_createdAt: '2024-06-02',
      transaction_id: 'W2dDKvrvdKqknHUD18kn',
      transaction_invoice: '',
      transaction_mode: 'expense',
      transaction_note: 'abc',
    },
    {
      timestamp: '2024-06-02T06:45:05.736Z',
      transaction_account: {id: 2, image: 60, name: 'Credit / Debit Card'},
      transaction_amount: 20,
      transaction_category: {id: 2, image: 30, name: 'Coupons'},
      transaction_createdAt: '2024-06-02',
      transaction_id: 'I4NaXQwbXFL8PvTxbwSo',
      transaction_invoice: '',
      transaction_mode: 'income',
      transaction_note: '',
    },
    {
      timestamp: '2024-06-01T06:59:16.022Z',
      transaction_account: {id: 1, image: 59, name: 'Cash'},
      transaction_amount: 500,
      transaction_category: {id: 14, image: 35, name: 'Sport'},
      transaction_createdAt: '2024-06-01',
      transaction_id: '5imLizAQ1W57NMWI5eFJ',
      transaction_invoice: '',
      transaction_mode: 'expense',
      transaction_note: 'Smit cricket na',
    },
    {
      timestamp: '2024-05-26T06:47:52.272Z',
      transaction_account: {id: 2, image: 60, name: 'Credit / Debit Card'},
      transaction_amount: 5200,
      transaction_category: {id: 3, image: 27, name: 'Grants'},
      transaction_createdAt: '2024-05-26',
      transaction_id: 'W5yCoNNVV28uNDfppWEk',
      transaction_invoice: '',
      transaction_mode: 'income',
      transaction_note: '',
    },
    {
      timestamp: '2024-05-26T07:02:29.023Z',
      transaction_account: {id: 2, image: 60, name: 'Credit / Debit Card'},
      transaction_amount: 500,
      transaction_category: {id: 6, image: 25, name: 'Other'},
      transaction_createdAt: '2024-05-26',
      transaction_id: 'VoKv7pe3ckqUOhI2txzb',
      transaction_invoice:
        'https://firebasestorage.googleapis.com/v0/b/expensetracker-183c7.appspot.com/o/invoices%2FIMG_0002.JPG?alt=media&token=b91c9776-d784-4ded-9831-d48c627f6151',
      transaction_mode: 'income',
      transaction_note: 'Bills',
    },
    {
      timestamp: '2024-05-26T07:02:21.243Z',
      transaction_account: {id: 2, image: 60, name: 'Credit / Debit Card'},
      transaction_amount: 500,
      transaction_category: {id: 15, image: 32, name: 'Tax'},
      transaction_createdAt: '2024-05-26',
      transaction_id: 'IUZ6CqdQPfSo3gbi7xch',
      transaction_invoice:
        'https://firebasestorage.googleapis.com/v0/b/expensetracker-183c7.appspot.com/o/invoices%2FIMG_0002.JPG?alt=media&token=b91c9776-d784-4ded-9831-d48c627f6151',
      transaction_mode: 'expense',
      transaction_note: 'Okhlik',
    },
    {
      timestamp: '2024-05-25T13:06:46.546Z',
      transaction_account: {id: 1, image: 50, name: 'Cash'},
      transaction_amount: 500,
      transaction_category: {id: 2, image: 48, name: 'Coupons'},
      transaction_createdAt: '2024-05-25',
      transaction_id: 'YEemPC6D8cEiBnR90Dsl',
      transaction_invoice: '',
      transaction_mode: 'income',
      transaction_note: '',
    },
    {
      timestamp: '2024-05-25T13:06:56.162Z',
      transaction_account: {id: 2, image: 51, name: 'Credit / Debit Card'},
      transaction_amount: 200,
      transaction_category: {id: 6, image: 43, name: 'Other'},
      transaction_createdAt: '2024-05-25',
      transaction_id: 'UvtLtZXKn8jfddNAlSjd',
      transaction_invoice: '',
      transaction_mode: 'income',
      transaction_note: '',
    },
    {
      timestamp: '2024-05-19T10:54:04.779Z',
      transaction_account: {id: 3, image: 49, name: 'UPI / Net Banking'},
      transaction_amount: 777,
      transaction_category: {id: 2, image: 48, name: 'Coupons'},
      transaction_createdAt: '2024-05-19',
      transaction_id: 'p6boo3i6YnikQ8orzrdc',
      transaction_invoice: '',
      transaction_mode: 'income',
      transaction_note: 'Gh',
    },
    {
      timestamp: '2024-05-19T11:18:09.096Z',
      transaction_account: {id: 3, image: 49, name: 'UPI / Net Banking'},
      transaction_amount: 545,
      transaction_category: {id: 2, image: 48, name: 'Coupons'},
      transaction_createdAt: '2024-05-18',
      transaction_id: 'zeg5yNCS2r0xV2hWAosr',
      transaction_invoice: '',
      transaction_mode: 'income',
      transaction_note: 'Move ',
    },
    {
      timestamp: '2024-05-19T11:18:16.002Z',
      transaction_account: {id: 2, image: 51, name: 'Credit / Debit Card'},
      transaction_amount: 5656,
      transaction_category: {id: 14, image: 28, name: 'Sport'},
      transaction_createdAt: '2024-05-18',
      transaction_id: '7P5W6gE6WoP0Cm92eG6g',
      transaction_invoice: '',
      transaction_mode: 'expense',
      transaction_note: 'Gdf',
    },
    {
      timestamp: '2024-05-19T11:17:45.790Z',
      transaction_account: {id: 3, image: 49, name: 'UPI / Net Banking'},
      transaction_amount: 3453,
      transaction_category: {id: 17, image: 40, name: 'Transport'},
      transaction_createdAt: '2024-05-17',
      transaction_id: 'P2wM22092LQKO5oLyuil',
      transaction_invoice: '',
      transaction_mode: 'expense',
      transaction_note: 'Dgh',
    },
    {
      timestamp: '2024-05-19T11:18:33.059Z',
      transaction_account: {id: 3, image: 49, name: 'UPI / Net Banking'},
      transaction_amount: 4543,
      transaction_category: {id: 4, image: 46, name: 'Refund'},
      transaction_createdAt: '2024-05-16',
      transaction_id: 'nKh48QChOV8rN3uuSEoN',
      transaction_invoice: '',
      transaction_mode: 'income',
      transaction_note: 'Fg',
    },
  ];

  const [data, setData] = useState(transactions);
  const [pdf, setPdf] = useState<string | undefined>();

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={ColorConst.status_bar}
        barStyle="dark-content"
      />
      <CommonHeader title={'Export Data'} onPress={onBackPress} />
      <View style={styles.subContainer}>
        <View>
          <ExportDataDropDown
            placeholder={'Select item'}
            title={'What data do your want to export?'}
            data={ExportDataType}
            onChange={onDataChange}
            value={selectedData.value}
          />
          <ExportDataDropDown
            placeholder={'Select Date Range'}
            title={'When Date Range?'}
            data={TimeDuration}
            onChange={onDateChange}
            value={selectedDate.value}
          />
        </View>
        <PrimaryButton
          title="Export Data"
          onPress={onExportPress}
          customGradientStyle={{marginBottom: hp(7)}}
        />
      </View>
      {/* {pdfPath ? (
        <Pdf
          source={{uri: pdfPath}}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={{
            flex: 1,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        />
      ) : null} */}
    </View>
  );
};

export default ExportDataScreen;
