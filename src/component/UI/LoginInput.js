import {StyleSheet, Text, TextInput, View} from 'react-native';

import {GlobalStyles} from '../../constants/styles';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  onFocus,
  onBlur,
  hint,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.invalidLabel]}>
        {[label, isInvalid && hint]}
      </Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },

  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary,
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    color: GlobalStyles.colors.primary,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary,
    paddingTop: 6,
    paddingRight: 6,
    paddingLeft: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error50,
  },
});
