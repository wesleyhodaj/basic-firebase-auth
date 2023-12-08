import {FlatList, StyleSheet} from 'react-native';
import ExpensesItem from './ExpensesItem';

function renderExpenseItem(itemData) {
  return <ExpensesItem {...itemData.item} />;
}
function ExpensesList({expensesList}) {
  return (
    <FlatList
      data={expensesList}
      renderItem={renderExpenseItem}
      keyExtractor={item => item.id}
    />
  );
}

export default ExpensesList;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    padding: 5,
  },
});
