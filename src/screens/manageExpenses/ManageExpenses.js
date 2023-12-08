import {StyleSheet, View} from 'react-native';
import {useContext, useLayoutEffect, useState} from 'react';
import IconButton from '../../component/UI/IconButton.js.js';
import {GlobalStyles} from '../../constants/styles.js';
import Button from '../../component/UI/Button.js';
import {ExpensesContext} from '../../context/expenses-context.js';
import {addExpense, deleteExpense, updateExpense} from '../../util/httpUtil.js';
import LoadingOverlay from '../../component/UI/LoadingOverlay.js';
import ErrorOverlay from '../../component/UI/ErrorOverlay.js';
import ExpenseForm from '../../component/UI/ExpenseForm.js';

function ManageExpenses({route, navigation}) {
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  const itemId = route.params?.expenseId;
  const isEditing = !!itemId;

  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === itemId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add new expense',
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setisLoading(true);
    try {
      await deleteExpense(itemId);
      expensesCtx.deleteExpense(itemId);
      navigation.goBack();
    } catch (error) {
      setisLoading(false);
      setError('There was an error!');
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setisLoading(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(itemId, expenseData);
        await updateExpense(itemId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({...expenseData, id: id});
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setisLoading(false);
    }
  }
  function errorHandler() {
    setError(null);
  }

  if (error && !isLoading) {
    return <ErrorOverlay text={error} onConfirm={errorHandler} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={30}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 24,
    backgroundColor: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 8,
    minWidth: 120,
  },
  deleteContainer: {
    marginTop: 20,
    paddingTop: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: GlobalStyles.colors.primary200,
  },
});
