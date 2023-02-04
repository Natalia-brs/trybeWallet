export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const GET_DATA = 'GET_DATA';
export const API_ERROR = 'API_ERROR';
export const TOTAL = 'TOTAL';
export const SET_EXPENSE = 'SET_EXPENSE';
export const REMOVE_ID = 'REMOVE_ID';
export const ATT_VALUE = 'ATT_VALUE';

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const attValue = () => ({
  type: ATT_VALUE,
});

export const apiRequest = () => ({
  type: REQUEST_API,
});

export const removeID = (id) => ({
  type: REMOVE_ID,
  id,
});

export const getData = (data) => ({
  type: GET_DATA,
  data,
});

export const apiError = (error) => ({
  type: API_ERROR,
  error,
});

export const total = (amount) => ({
  type: TOTAL,
  amount,
});

export const setExpense = (expense) => ({
  type: SET_EXPENSE,
  expense,
});

export const gettNewExpense = (expenseObject) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;

    const expense = { ...expenseObject, exchangeRates: data };
    const cambio = Object.values(data)
      .find((item) => item.code === expenseObject.currency);

    const newTotal = expenseObject.value * cambio.ask;

    dispatch(total(newTotal));
    dispatch(setExpense(expense));
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const apiFetch = () => async (dispatch) => {
  try {
    dispatch(apiRequest());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(getData(data));
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const updateTable = (id) => (dispatch) => {
  dispatch(removeID(id));
  dispatch(attValue());
};
