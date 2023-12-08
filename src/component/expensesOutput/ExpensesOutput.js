import {StyleSheet, Text, View} from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';

import LoadingOverlay from '../../component/UI/LoadingOverlay';

import {useState} from 'react';

function ExpensesOutput({expensesList, expensesPeriodName, fallbackText}) {
  const [isLoading, setisLoading] = useState(false);

  if (isLoading) {
    return <LoadingOverlay />;
  }
  let content = <Text style={style.infoText}>{fallbackText}</Text>;
  let banner;

  if (expensesList.length > 0) {
    banner = (
      <ExpensesSummary
        expenses={expensesList}
        periodName={expensesPeriodName}
      />
    );
    content = <ExpensesList expensesList={expensesList} />;
  }
  return (
    <View style={style.noTextView}>
      {banner}
      {content}
    </View>
  );
}

export default ExpensesOutput;

const style = StyleSheet.create({
  infoText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
  },
  noTextView: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
