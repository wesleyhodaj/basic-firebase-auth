import LoadingOverlay from '../../component/UI/LoadingOverlay';
import {createUser, login} from '../../util/httpUtil';
import {useState} from 'react';
import AuthContent from './AuthContent';
import {useDispatch} from 'react-redux';
import {Login} from '../../store/actions';
import {Alert} from 'react-native';

function LoginScreen() {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  async function signUpHandler({email, password}) {
    setisLoading(true);
    const token = await login(email, password);
    console.log(email, password);
    if (token != null) {
      dispatch(Login(token));
    } else {
      Alert.alert('Error login', 'Please check your entered credentials.');
    }
    setisLoading(false);
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return <AuthContent isLogin onAuthenticate={signUpHandler} />;
}

export default LoginScreen;
