import ExpensesOutput from '../component/expensesOutput/ExpensesOutput';
import {useContext} from 'react';
import {ExpensesContext} from '../context/expenses-context';

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expensesList={expensesCtx.expenses}
      expensesPeriodName="Total expenses"
      fallbackText={'There is nothing at all here'}
    />
  );
}
export default AllExpenses;
