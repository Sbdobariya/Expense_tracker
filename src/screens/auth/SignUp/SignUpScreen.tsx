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
  UserDataType,
  AuthReducerType,
  UserSignUpActionRequest,
} from '../../../interface';
import React, {useState} from 'react';
import {View} from 'react-native';
import {styles} from './SignUpScreenStyle';
import {useDispatch, useSelector} from 'react-redux';
import {AuthStrings} from '../../../constants/String';
import {AuthContext} from '../../../utils/AuthContext';
import {UserSignUpAction} from '../../../redux/actions';
import {AuthNavigationType, RootPage} from '../../../navigation/type';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ColorConst} from '../../../theme';
import {ShowTostMessage} from '../../../utils';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthNavigationType>>();
  const dispatch = useDispatch();
  const {signUp} = React.useContext(AuthContext);
  const {isLoading} = useSelector(
    (state: {authReducer: AuthReducerType}) => state?.authReducer,
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordHide, setPasswordHide] = useState(true);

  const onSingUpPress = () => {
    if (name === '') {
      ShowTostMessage('Please enter name', 'error');
    } else if (email === '') {
      ShowTostMessage('Please enter email', 'error');
    } else if (password === '') {
      ShowTostMessage('Please enter password', 'error');
    } else if (password?.length < 6) {
      ShowTostMessage('Minimum length of password is 6s', 'error');
    } else {
      const userData: UserSignUpActionRequest = {
        data: {userName: name, userEmail: email, userPassword: password},
        onSuccess: response => {
          signUp(response as UserDataType);
        },
        onFail: error => {
          ShowTostMessage(JSON.stringify(error), 'error');
        },
      };
      dispatch(UserSignUpAction(userData) as any);
    }
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar backgroundColor={ColorConst.status_bar} />
      <CommonLoader isVisible={isLoading} />
      <CommonHeader
        title={AuthStrings.sign_up}
        onPress={() => navigation.goBack()}
      />
      <InputText
        value={name}
        placeholder={AuthStrings.name}
        inputCustomStyle={styles.nameInput}
        onChangeText={(txt: string) => setName(txt)}
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
      <PrimaryButton
        onPress={onSingUpPress}
        title={AuthStrings.sign_up}
        customGradientStyle={styles.signUpButtonStyle}
      />
      <StringDivider
        titleTwo={AuthStrings.login}
        titleOne={AuthStrings.already_have_an_account}
        onPress={() => navigation.navigate(RootPage.LoginScreen)}
      />
    </View>
  );
};

export default SignUpScreen;
