const {createContext, useReducer} = require('react');

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({id, desciption, amount, date}) => {},
  setExpense: ({desciption, amount, date}) => {},
  deleteExpense: id => {},
  updateExpense: (id, {desciption, amount, date}) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'SET':
      return action.payload;
    case 'UPDATE':
      const expensesIndex = state.findIndex(
        expense => expense.id === action.payload.id,
      );
      console.log('expensesItem????', expensesIndex);
      const expensesItem = state[expensesIndex];
      const updatedItem = {...expensesItem, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[expensesIndex] = updatedItem;

      return updatedExpenses;
    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);

    default:
      return state;
  }
}

function ExpensesContextProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }

  function setExpense(id) {
    dispatch({type: 'SET', payload: id});
  }

  function deleteExpense(expenses) {
    dispatch({type: 'DELETE', payload: expenses});
  }

  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpense: setExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
