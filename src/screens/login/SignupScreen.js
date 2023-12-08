import LoadingOverlay from '../../component/UI/LoadingOverlay';
import {Login} from '../../store/actions';
import {createUser} from '../../util/httpUtil';
import AuthContent from './AuthContent';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

function SignupScreen() {
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  async function signUpHandler({email, password}) {
    setisLoading(true);
    const token = await createUser(email, password);

    dispatch(Login(token));

    setisLoading(false);
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
