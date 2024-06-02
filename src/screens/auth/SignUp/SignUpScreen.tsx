import {
  InputText,
  PrimaryButton,
  StringDivider,
  CommonHeader,
  CommonLoader,
  CustomStatusBar,
} from '../../../components';
import {
  UserDataType,
  AuthReducerType,
  UserSignUpActionRequest,
} from '../../../interface';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {styles} from './SignUpScreenStyle';
import {useDispatch, useSelector} from 'react-redux';
import {AuthStrings} from '../../../constants/String';
import {AuthContext} from '../../../utils/AuthContext';
import {UserSignUpAction} from '../../../redux/actions';
import {AuthNavigationType, RootPage} from '../../../navigation/type';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ColorConst} from '../../../theme';

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

  const onSingupPress = () => {
    if (name === '') {
      Alert.alert('Please enter name');
    } else if (email === '') {
      Alert.alert('Please enter email');
    } else if (password === '') {
      Alert.alert('Please enter password');
    } else if (password?.length < 6) {
      Alert.alert('Minimum length of password is 6s');
    } else {
      const userData: UserSignUpActionRequest = {
        data: {userName: name, userEmail: email, userPassword: password},
        onSuccess: response => {
          signUp(response as UserDataType);
        },
        onFail: error => {
          Alert.alert(JSON.stringify(error));
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
        placeholder={AuthStrings.email}
        inputCustomStyle={styles.emailInput}
        onChangeText={(txt: string) => setEmail(txt)}
      />
      <InputText
        value={password}
        autoCapitalize="none"
        placeholder={AuthStrings.Password}
        inputCustomStyle={styles.emailInput}
        onChangeText={(txt: string) => setPassword(txt)}
      />
      <PrimaryButton
        onPress={onSingupPress}
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
