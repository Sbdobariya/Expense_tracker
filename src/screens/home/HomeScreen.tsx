import {
  HomeCard,
  HomeHeader,
  TransactionList,
  EditCategoryModal,
} from '../../components';
import React from 'react';
import {useHome} from './useHome';
import {styles} from './HomeScreenStyle';
import {FlatList, Text, View} from 'react-native';
import {HomeStrings} from '../../constants/String';
import {RootPage, TabStack} from '../../navigation/type';
import {useNavigation, NavigationProp} from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const tabNavigation = useNavigation<NavigationProp<TabStack>>();

  const {
    onEditPress,
    toggleModal,
    onDeletePress,
    transactionData,
    isVisibleEditModal,
    onTransactionPress,
  } = useHome();

  const onSeeAllPress = () => {
    tabNavigation.navigate(RootPage.Transaction, {
      screen: RootPage.TransactionScreen,
    });
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText1}>
          {HomeStrings.transactions_history}
        </Text>
        <Text onPress={onSeeAllPress} style={styles.seeAllText}>
          {HomeStrings.see_all}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HomeHeader />
      <HomeCard transactionData={transactionData} />
      <FlatList
        data={transactionData}
        renderItem={({item, index}) => {
          return (
            <TransactionList
              item={item}
              index={index}
              onTransactionPress={onTransactionPress}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
        style={styles.flatlistStyle}
      />
      <EditCategoryModal
        onDeletePress={onDeletePress}
        onEditPress={onEditPress}
        isVisible={isVisibleEditModal.isVisible}
        toggleModal={toggleModal}
        items={isVisibleEditModal.item || undefined}
      />
    </View>
  );
};

export default HomeScreen;
