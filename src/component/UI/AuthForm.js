import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import Button from './Button';
import Input from './LoginInput';
import {GlobalStyles} from '../../constants/styles';
import {createUser, login} from '../../util/httpUtil';
import LoadingOverlay from '../../component/UI/LoadingOverlay';
import {useDispatch} from 'react-redux';
import {Login} from '../../store/actions';
import {useLoading} from '../../context/loading-overlay-context';

function AuthForm({isLogin, onAuthenticate}) {
  const [inputs, setInputs] = React.useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({
    emailError: false,
    confirmEmailError: false,
    passwordError: false,
    confirmPasswordError: false,
  });
  const {loading, setLoading} = useLoading();

  const dispatch = useDispatch();

  const handleOnChange = (input, errorInput, text) => {
    let isValid;

    switch (input) {
      case 'email':
        isValid = validateEmail(text);
        break;
      case 'password':
        isValid = validatePassword(text);
        break;
      case 'confirmEmail':
        isValid = validateConfirmEmail(text);
        break;
      case 'confirmPassword':
        isValid = validateConfirmPassword(text);
        break;
    }
    handleValidation(input, text);
    handleError(errorInput, !isValid);
  };

  const handleValidation = (input, text) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (input, value) => {
    setErrors(prevState => ({...prevState, [input]: value}));
  };

  const validateEmail = text => {
    if (!text) {
      return false;
    } else if (!text.match(/\S+@\S+\.\S+/)) {
      return false;
    } else {
      return true;
    }
  };
  const validateConfirmEmail = text => {
    if (!isLogin && text !== inputs.email) {
      return false;
    } else {
      return true;
    }
  };
  const validateConfirmPassword = text => {
    if (!isLogin && text !== inputs.password) {
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = text => {
    if (!text) {
      handleError('password', 'Please Enter a Password');
      return false;
    } else if (text.length < 8) {
      return false;
    }
    if (!isLogin && !text) {
      handleError('Please Enter Confirm Password', 'confirmPassword');
      return false;
    } else if (text !== text) {
      handleError('Password Confirmation does not match', 'confirmPassword');
      return false;
    } else {
      return true;
    }
  };

  function submitHandler() {
    if (
      errors.confirmEmailError ||
      errors.emailError ||
      errors.passwordError ||
      errors.confirmPasswordError ||
      inputs.email === ''
    )
      return Alert.alert('Attention!', 'Please fill all the fields.');

    // onAuthenticate({email: inputs.email, password: inputs.password});
    signUpHandler({email: inputs.email, password: inputs.password});
  }
  async function signUpHandler({email, password}) {
    setLoading(true);
    const token = await login(email, password);
    console.log(email, password);
    if (token != null) {
      dispatch(Login(token));
    } else {
      Alert.alert('Error login', 'Please check your entered credentials.');
    }
    setLoading(false);
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          keyboardType="email-address"
          onUpdateValue={text => handleOnChange('email', 'emailError', text)}
          value={inputs.email}
          isInvalid={errors.emailError}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            onUpdateValue={text =>
              handleOnChange('confirmEmail', 'confirmEmailError', text)
            }
            value={inputs.confirmEmail}
            keyboardType="email-address"
            isInvalid={errors.confirmEmailError}
          />
        )}

        <Input
          label="Password"
          secure
          onUpdateValue={text =>
            handleOnChange('password', 'passwordError', text)
          }
          value={inputs.password}
          isInvalid={errors.passwordError}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            onUpdateValue={text =>
              handleOnChange('confirmPassword', 'confirmPasswordError', text)
            }
            secure
            value={inputs.confirmPassword}
            isInvalid={errors.confirmPasswordError}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 32,
    color: GlobalStyles.colors.primary,
  },
});
