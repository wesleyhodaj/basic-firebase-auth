import {StyleSheet, View} from 'react-native';

import {useState} from 'react';
import {useDispatch} from 'react-redux';

import Button from '../component/UI/Button';
import {Logout} from '../store/actions';

function Profile() {
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  function onPress() {
    setisLoading(true);
    dispatch(Logout());
    setisLoading(false);
  }

  return (
    <View style={style.container}>
      <Button onPress={onPress}>Logout</Button>
    </View>
  );
}

export default Profile;

const style = StyleSheet.create({
  infoText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  container: {
    justifyContent: 'flex-end',
    paddingBottom: 20,
    flex: 1,
  },
});
