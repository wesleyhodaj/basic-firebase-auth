import {useState} from 'react';
import {Alert, StyleSheet, View, Image, Text} from 'react-native';

import {GlobalStyles} from '../../constants/styles';
import FlatButton from '../../component/UI/FlatButton';
import AuthForm from '../../component/UI/AuthForm';
import {useNavigation} from '@react-navigation/native';

function AuthContent({isLogin = false, onAuthenticate}) {
  const navigation = useNavigation();

  // const [credentialsInvalid, setCredentialsInvalid] = useState({
  //   email: false,
  //   password: false,
  //   confirmEmail: false,
  //   confirmPassword: false,
  // });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  const source = isLogin
    ? require('../../assets/hands.png')
    : require('../../assets/hand-in-hand.png');

  return (
    <View style={styles.authContent}>
      <Image style={styles.logo} source={source} />
      <View style={{paddingVertical: 40}}>
        <Text style={[styles.text, styles.textTitle]}>WELCOME</Text>
        <Text style={styles.text}>
          {isLogin
            ? ' Before enjoying the app services Please register'
            : ' For enjoying the app services please Log in '}
        </Text>
      </View>

      <AuthForm isLogin={isLogin} onAuthenticate={onAuthenticate} />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'Create a new user' : 'Log in instead'}
        </FlatButton>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    padding: 16,
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary50,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  buttons: {
    marginTop: 8,
  },
  text: {
    textAlign: 'center',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
