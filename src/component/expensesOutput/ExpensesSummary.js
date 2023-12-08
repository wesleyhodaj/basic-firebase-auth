import {Text, StyleSheet, View} from 'react-native';
import {GlobalStyles} from '../../constants/styles';

function ExpensesSummary({expenses, periodName}) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{periodName}</Text>
      <Text style={styles.text}>${expensesSum}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: GlobalStyles.colors.accent500,
  },
  text: {
    color: 'white',
  },
});
