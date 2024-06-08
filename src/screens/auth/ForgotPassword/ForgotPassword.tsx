import {View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './ForgotPasswordStyle';
import {CommonHeader, InputText, PrimaryButton} from '../../../components';
import {useNavigation} from '@react-navigation/native';
import {ShowTostMessage} from '../../../utils';
import auth from '@react-native-firebase/auth';

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  const onSendPress = () => {
    if (email === '') {
      ShowTostMessage('Please Enter Email', 'error');
    } else {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          ShowTostMessage('Please check your email', 'success');
          navigation.goBack();
        });
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        title="Forgot Password"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.subContainer}>
        <InputText
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder={'Enter Registered Email'}
          inputCustomStyle={styles.emailInput}
          onChangeText={(txt: string) => setEmail(txt)}
        />
        <PrimaryButton
          title="Send"
          customGradientStyle={styles.bottomButton}
          onPress={onSendPress}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
