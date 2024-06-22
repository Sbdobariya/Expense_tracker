import {
  HomeCard,
  HomeHeader,
  TransactionList,
  EditCategoryModal,
  CustomStatusBar,
  CommonLoader,
} from '../../components';
import React from 'react';
import {useHome} from './useHome';
import {styles} from './HomeScreenStyle';
import {FlatList, Text, View} from 'react-native';
import {HomeStrings} from '../../constants/String';
import {RootPage, TabStack} from '../../navigation/type';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {ColorConst} from '../../theme';
import {AuthLoader} from '../../redux/reducer';

const HomeScreen: React.FC = () => {
  const tabNavigation = useNavigation<NavigationProp<TabStack>>();

  const {
    onEditPress,
    toggleModal,
    onDeletePress,
    transactionData,
    isVisibleEditModal,
    onTransactionPress,
    isLoading,
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
  console.log('transactionData----------', transactionData);
  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={ColorConst.status_bar} />
      <HomeHeader />
      <CommonLoader isVisible={isLoading} />
      <HomeCard transactionData={transactionData} />
      <FlatList
        data={transactionData?.slice(0, 10)}
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
        onEditPress={onEditPress}
        toggleModal={toggleModal}
        onDeletePress={onDeletePress}
        isVisible={isVisibleEditModal.isVisible}
        items={isVisibleEditModal.item || undefined}
      />
    </View>
  );
};

export default HomeScreen;
