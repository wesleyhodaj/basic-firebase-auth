import {GlobalStyles} from '../../constants/styles';

const {View, StyleSheet, Pressable, Text} = require('react-native');

function Button({children, onPress, mode, style}) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.button, mode === 'flat' && styles.flat]}>
          <Text style={[styles.text, mode === 'flat' && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    marginHorizontal: 4,
    padding: 8,
    borderWidth: 0.4,
    backgroundColor: GlobalStyles.colors.primary200,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
