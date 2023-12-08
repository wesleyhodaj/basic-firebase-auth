import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

function LoadingOverlay(params) {
  return (
    <View style={style.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

export default LoadingOverlay;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
