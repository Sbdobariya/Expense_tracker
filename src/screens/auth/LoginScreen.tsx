import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ColorConst, StringConst, hp} from '../../utils';
import {
  CommanHeader,
  InputText,
  PrimaryButton,
  StringDivider,
} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthNavigationType} from '../../navigation';
import {
  AuthReducerType,
  UserSignInActionRequest,
  userDataType,
} from '../../interface/AuthInterFace';
import CommanLoader from '../../components/comman/CommanLoader';
import {AuthContext} from '../../utils/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {UserSignInActions} from '../../redux/actions/auth/AuthAction';

type Login = NativeStackScreenProps<AuthNavigationType, 'LoginScreen'> & {
  navigation: () => void;
};

const LoginScreen: React.FC<Login> = (props: Login) => {
  const {navigation} = props;

  const dispatch = useDispatch();
  const {signIn} = React.useContext(AuthContext);
  const {isLoading} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    if (email == '') {
      Alert.alert('Please enter email');
    } else if (password == '') {
      Alert.alert('Please enter password');
    } else {
      const userData: UserSignInActionRequest = {
        data: {userEmail: email, userPassword: password},
        onSuccess: response => {
          signIn(response as userDataType);
        },
        onFail: error => {
          Alert.alert(JSON.stringify(error));
        },
      };
      dispatch(UserSignInActions(userData) as any);
    }
  };
  return (
    <View style={styles.container}>
      <CommanLoader isVisible={isLoading} />
      <CommanHeader
        title={StringConst.login}
        onPress={() => navigation.goBack()}
      />
      <InputText
        value={email}
        autoCapitalize="none"
        placeholder={StringConst.email}
        inputCustomeStyle={styles.emailInput}
        onChangeText={(txt: string) => setEmail(txt)}
      />
      <InputText
        value={password}
        autoCapitalize="none"
        placeholder={StringConst.Password}
        inputCustomeStyle={styles.passwordInput}
        onChangeText={(txt: string) => setPassword(txt)}
      />
      <PrimaryButton
        onPress={onLoginPress}
        title={StringConst?.login}
        customeGradientStyle={styles.loginButtonStyle}
      />
      <StringDivider
        titleTwo={StringConst.sign_up}
        titleOne={StringConst.already_have_an_account}
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  emailInput: {
    marginTop: hp(6.89),
  },
  passwordInput: {
    marginTop: hp(2.95),
  },
  loginButtonStyle: {
    marginTop: hp(10),
  },
});
