import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CommanHeader from '../../components/comman/CommanHeader';
import {StringConst} from '../../utils';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthNavigationType} from '../../navigation';

type Signup = NativeStackScreenProps<AuthNavigationType, 'SignUpScreen'> & {
  navigation: () => void;
};

const SignUpScreen: React.FC<Signup> = (props: Signup) => {
  const {navigation} = props;
  return (
    <View>
      <CommanHeader
        title={StringConst.sign_up}
        onPress={() => navigation.goBack()}
      />
      <Text>SignUpScreen</Text>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
