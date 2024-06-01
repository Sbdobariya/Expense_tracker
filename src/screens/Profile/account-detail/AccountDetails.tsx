import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './AccountDetailStyle';
import {useAccountDetail} from './useAccountDetail';
import {
  AmountText,
  CategoryIcons,
  CommonHeader,
  EditCategoryModal,
} from '../../../components';
import {FormattedTransaction} from '../../../interface';

const AccountDetails: React.FC = () => {
  const {
    params,
    onBackPress,
    formattedData,
    isVisibleEditModal,
    onDeletePress,
    toggleModal,
    onEditPress,
    onTransactionPress,
  } = useAccountDetail();

  const renderTransaction = ({item}: {item: FormattedTransaction}) => (
    <TouchableOpacity
      style={styles.transactionContainer}
      onPress={() => onTransactionPress(item)}>
      <View style={styles.transactionImage}>
        <Image source={item.transaction_category?.image} style={styles.image} />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionCategory}>
          {item.transaction_category?.name}
        </Text>
        <Text style={styles.transactionNote}>{item.transaction_note}</Text>
        <Text style={styles.transactionTime}>{item.transaction_createdAt}</Text>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          {
            color: item.transaction_mode == 'income' ? 'green' : 'red',
          },
        ]}>
        {item.transaction_mode == 'income'
          ? `+ ${item.transaction_amount}`
          : `- ${item.transaction_amount}`}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CommonHeader title={'Accounts Details'} onPress={onBackPress} />
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          {params.accountImage && (
            <CategoryIcons
              imageSource={params.accountImage}
              customCategoryImageView={styles.customCategoryImageView}
            />
          )}
          <Text style={styles.balanceText}>{params.accountName}</Text>
          <AmountText
            num={params.transactionAmount}
            customRupeeIcon={styles.customRupeeIcon}
            customNumStyle={styles.totalBalanceText}
          />
        </View>
        <FlatList
          data={formattedData}
          style={styles.flatlistStyle}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={styles.footerComponent} />}
          keyExtractor={item => item.date}
          renderItem={({item}) => (
            <View>
              <Text style={styles.date}>{item.date}</Text>
              <FlatList
                data={item.transactions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderTransaction}
              />
            </View>
          )}
        />
      </View>
      <EditCategoryModal
        onEditPress={onEditPress}
        toggleModal={toggleModal}
        onDeletePress={onDeletePress}
        isVisible={isVisibleEditModal.isVisible}
        items={isVisibleEditModal.item || undefined}
      />
    </View>
  );
};

export default AccountDetails;
