import {View, StyleSheet, Text, Button} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

function ErrorOverlay({text, onConfirm}) {
  return (
    <View style={style.container}>
      <Text style={[style.text, style.title]}>An error occured!</Text>
      <Text style={style.text}>{text}</Text>
      <Button onPress={onConfirm} title="Understood!"></Button>
    </View>
  );
}

export default ErrorOverlay;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
