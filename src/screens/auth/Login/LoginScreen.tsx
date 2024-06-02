import {View} from 'react-native';
import React, {useState} from 'react';
import {
  InputText,
  PrimaryButton,
  StringDivider,
  CommonHeader,
  CommonLoader,
  CustomStatusBar,
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
import {ColorConst} from '../../../theme';
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
        placeholder={AuthStrings.email}
        inputCustomStyle={styles.emailInput}
        onChangeText={(txt: string) => setEmail(txt)}
      />
      <InputText
        value={password}
        autoCapitalize="none"
        placeholder={AuthStrings.Password}
        inputCustomStyle={styles.passwordInput}
        onChangeText={(txt: string) => setPassword(txt)}
      />
      <PrimaryButton
        onPress={onLoginPress}
        title={AuthStrings.login}
        customGradientStyle={styles.loginButtonStyle}
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
