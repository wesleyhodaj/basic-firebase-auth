const {default: axios} = require('axios');

const API_KEY = 'AIzaSyBMsZ1RhiID8yQh3-nIoNTqhq844GUUgpU';

const BACKEND_URL =
  'https://firetest-95cb6-default-rtdb.europe-west1.firebasedatabase.app/';

export async function addExpense(expenseData) {
  const response = await axios.post(BACKEND_URL + 'expenses.json', expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpense(expenseData) {
  const response = await axios.get(BACKEND_URL + 'expenses.json');
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `expenses/${id}.json`);
}

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  console.log(email, password);
  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    return response.data.idToken;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
