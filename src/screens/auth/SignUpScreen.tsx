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
  UserSignUpActionRequest,
} from '../../interface/AuthInterFace';
import React, {useState} from 'react';
import {AuthContext} from '../../utils/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {UserSignUpAction} from '../../redux/actions';
import {Alert, StyleSheet, View} from 'react-native';
import {ColorConst, StringConst, hp} from '../../utils';
import {AuthNavigationType} from '../../navigation/type';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Signup = NativeStackScreenProps<AuthNavigationType, 'SignUpScreen'> & {
  navigation: () => void;
};

const SignUpScreen: React.FC<Signup> = (props: Signup) => {
  const {navigation} = props;
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
          signUp(response as userDataType);
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
      <CommanLoader isVisible={isLoading} />
      <CommanHeader
        title={StringConst.sign_up}
        onPress={() => navigation.goBack()}
      />
      <InputText
        value={name}
        placeholder={StringConst.name}
        inputCustomeStyle={styles.nameInput}
        onChangeText={(txt: string) => setName(txt)}
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
        inputCustomeStyle={styles.emailInput}
        onChangeText={(txt: string) => setPassword(txt)}
      />
      <PrimaryButton
        onPress={onSingupPress}
        title={StringConst?.sign_up}
        customeGradientStyle={styles.signUpButtonStyle}
      />
      <StringDivider
        titleTwo={StringConst.login}
        titleOne={StringConst.already_have_an_account}
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorConst.white,
  },
  nameInput: {
    marginTop: hp(6.89),
  },
  emailInput: {
    marginTop: hp(2.95),
  },
  signUpButtonStyle: {
    marginTop: hp(10),
  },
});
