import AsyncStorage from '@react-native-async-storage/async-storage';

export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    if (token !== null) {
      console.log('token fetched');
      dispatch({
        type: 'LOGIN',
        payload: token,
      });
    }
  };
};

export const Login = token => {
  return async dispatch => {
    console.log('do we go here anywat');
    if (token == null) return;
    // here we can use login api to get token and then store it
    await AsyncStorage.setItem('token', token);
    console.log('token stored');

    dispatch({
      type: 'LOGIN',
      payload: token,
    });
  };
};

export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.removeItem('token');
    dispatch({
      type: 'LOGOUT',
    });
  };
};
