import {StyleSheet, Text} from 'react-native';
import ExpensesOutput from '../component/expensesOutput/ExpensesOutput';
import {useContext, useEffect, useState} from 'react';
import {ExpensesContext} from '../context/expenses-context';
import {getRecentDays} from '../util/dateUtil';
import {fetchExpense} from '../util/httpUtil';
import LoadingOverlay from '../component/UI/LoadingOverlay';
import ErrorOverlay from '../component/UI/ErrorOverlay';

function RecentExpenses() {
  const [isFetching, setisFetching] = useState(true);
  const [error, setError] = useState();
  const expesnesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setisFetching(true);
      try {
        const expenses = await fetchExpense();
        expesnesCtx.setExpense(expenses);
      } catch (error) {
        setError('Error fetching expenses!');
      }

      setisFetching(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    console.log('error');
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay text={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expesnesCtx.expenses.filter(expense => {
    const today = new Date();
    const sevenDaysAgo = getRecentDays(today, 7);
    return expense.date > sevenDaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expensesList={recentExpenses}
      expensesPeriodName="last daysss"
      fallbackText={'There is no data to show'}
    />
  );
}

export default RecentExpenses;
