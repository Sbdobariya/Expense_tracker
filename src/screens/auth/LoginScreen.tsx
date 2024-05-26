import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  InputText,
  CommanHeader,
  CommanLoader,
  PrimaryButton,
  StringDivider,
} from '../../components';
import {
  userDataType,
  AuthReducerType,
  UserSignInActionRequest,
} from '../../interface/AuthInterFace';
import {AuthContext} from '../../utils/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {UserSignInActions} from '../../redux/actions';
import {AuthNavigationType, RootPage} from '../../navigation/type';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ColorConst, hp} from '../../theme';
import {AuthStrings} from '../../constants/String';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthNavigationType>>();

  const dispatch = useDispatch();
  const {signIn} = React.useContext(AuthContext);
  const {isLoading} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    if (email === '') {
      Alert.alert('Please enter email');
    } else if (password === '') {
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
        title={AuthStrings.login}
        onPress={() => navigation.goBack()}
      />
      <InputText
        value={email}
        autoCapitalize="none"
        placeholder={AuthStrings.email}
        inputCustomeStyle={styles.emailInput}
        onChangeText={(txt: string) => setEmail(txt)}
      />
      <InputText
        value={password}
        autoCapitalize="none"
        placeholder={AuthStrings.Password}
        inputCustomeStyle={styles.passwordInput}
        onChangeText={(txt: string) => setPassword(txt)}
      />
      <PrimaryButton
        onPress={onLoginPress}
        title={AuthStrings.login}
        customeGradientStyle={styles.loginButtonStyle}
      />
      <StringDivider
        titleTwo={AuthStrings.sign_up}
        titleOne={AuthStrings.already_have_an_account}
        onPress={() => navigation.navigate(RootPage.LoginScreen)}
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
