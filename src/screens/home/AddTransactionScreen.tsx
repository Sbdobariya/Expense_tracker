import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ColorConst,
  ExpenseAray,
  ImageConst,
  fontSize,
  fonts,
  hp,
  wp,
} from '../../utils';
import TransactionTab from '../../components/addTransaction/TransactionTab';
import CategoryModal from '../../components/addTransaction/CategoryModal';

const AddTransactionScreen = () => {
  const [activeTab, setActiveTab] = useState('income');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[ColorConst.gradiant_color1, ColorConst.gradiant_color2]}
        style={[styles.linearGradient]}>
        <Image style={styles.headerImage} source={ImageConst.header_bg_ic} />
        <TouchableOpacity onPress={() => {}}>
          <Image
            source={ImageConst.left_icon_ic}
            style={styles.leftIconStyle}
          />
        </TouchableOpacity>
        <Text style={styles.heraderText}>Add Transaction</Text>
        <View style={styles.leftIconStyle} />
      </LinearGradient>
      <View style={styles.centerView}>
        <TransactionTab
          activeTab={activeTab}
          onIncomePress={val => setActiveTab(val)}
          onExpensePress={val => setActiveTab(val)}
        />
        <TouchableOpacity
          style={styles.selectCaegoryButton}
          onPress={() => setShowCategoryModal(true)}>
          <Image source={ImageConst.category_ic} style={styles.categoryIcon} />
          <Text style={styles.selectCategory}>Select Category</Text>
        </TouchableOpacity>
      </View>
      <CategoryModal
        isVisible={showCategoryModal}
        data={ExpenseAray}
        toggleModal={() => setShowCategoryModal(!showCategoryModal)}
      />
    </View>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  selectCaegoryButton: {
    gap: 10,
    marginTop: hp(2),
    padding: hp(1.5),
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(4),
    backgroundColor: '#29756F',
  },
  linearGradient: {
    width: '100%',
    height: hp(35),
    paddingTop: hp(10),
    flexDirection: 'row',
    borderBottomEndRadius: hp(5),
    borderBottomStartRadius: hp(5),
    justifyContent: 'space-between',
  },
  leftIconStyle: {
    width: hp(3.44),
    height: hp(3.44),
  },
  heraderText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSize(18),
    fontFamily: fonts.bold,
    color: ColorConst.white,
  },
  headerImage: {
    left: wp(-5),
    position: 'absolute',
  },
  centerView: {
    flex: 1,
    borderRadius: 20,
    marginTop: hp(-15),
    marginHorizontal: wp(7),
    backgroundColor: '#FFFFFF',

    // shado
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  categoryIcon: {
    height: hp(3),
    width: hp(3),
  },
  selectCategory: {
    color: '#FFFFFF',
    fontSize: fontSize(15),
    fontFamily: fonts.medium,
  },
});
