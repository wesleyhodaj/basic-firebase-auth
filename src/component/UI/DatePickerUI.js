import React, {useState, useEffect} from 'react';
import {Button, View, StyleSheet, Text, Pressable} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {GlobalStyles} from '../../constants/styles';

function DatePickerUI() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState(false);

  function onPressFunction() {
    setOpen(!open);
  }
  return (
    <>
      <Pressable onPress={onPressFunction}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{`${initial ? date : 'DD/MM/YYY'}`}</Text>
        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            if (!initial) {
              setInitial(true);
            }
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </Pressable>
    </>
  );
}
export default DatePickerUI;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
    marginTop: 30,
    borderRadius: 6,
    width: 170,
    height: 40,
    padding: 8,
    color: GlobalStyles.colors.primary50,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
});
