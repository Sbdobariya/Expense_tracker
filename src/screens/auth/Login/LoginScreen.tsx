import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  InputText,
  PrimaryButton,
  StringDivider,
  CommonHeader,
  CommonLoader,
  CustomStatusBar,
  PasswordInput,
} from '../../../components';
import {
  AuthReducerType,
  UserSignInActionRequest,
  UserDataType,
} from '../../../interface';
import {styles} from './LoginScreenStyle';
import {useDispatch, useSelector} from 'react-redux';
import {AuthStrings} from '../../../constants/String';
import {UserSignInActions} from '../../../redux/actions';
import {AuthNavigationType, RootPage} from '../../../navigation/type';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../utils/AuthContext';
import {ColorConst, fontSize, hp, wp} from '../../../theme';
import {ShowTostMessage} from '../../../utils';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthNavigationType>>();

  const dispatch = useDispatch();
  const {signIn} = React.useContext(AuthContext);

  const {isLoading} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);

  const onLoginPress = () => {
    if (email === '') {
      ShowTostMessage('Please enter email', 'error');
    } else if (password === '') {
      ShowTostMessage('Please enter password', 'error');
    } else {
      const userData: UserSignInActionRequest = {
        data: {userEmail: email, userPassword: password},
        onSuccess: response => {
          signIn(response as UserDataType);
        },
        onFail: error => {
          ShowTostMessage(JSON.stringify(error), 'error');
        },
      };
      dispatch(UserSignInActions(userData) as any);
    }
  };
  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={ColorConst.status_bar} />
      <CommonLoader isVisible={isLoading} />
      <CommonHeader
        title={AuthStrings.login}
        onPress={() => navigation.goBack()}
      />
      <InputText
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder={AuthStrings.email}
        inputCustomStyle={styles.emailInput}
        onChangeText={(txt: string) => setEmail(txt)}
      />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        passwordHide={passwordHide}
        setPasswordHide={setPasswordHide}
      />
      <TouchableOpacity
        style={styles.forgotPass}
        onPress={() => navigation.navigate(RootPage.ForgotPassword)}>
        <Text style={styles.forgotPassText}>Forgot Password</Text>
      </TouchableOpacity>
      <PrimaryButton
        onPress={onLoginPress}
        title={AuthStrings.login}
        customGradientStyle={styles.loginButtonStyle}
      />
      <StringDivider
        titleTwo={AuthStrings.sign_up}
        titleOne={AuthStrings.already_have_an_account}
        onPress={() => navigation.navigate(RootPage.SignUpScreen)}
      />
    </View>
  );
};

export default LoginScreen;
