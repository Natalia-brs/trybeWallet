import {
  API_ERROR,
  REQUEST_API,
  GET_DATA, TOTAL,
  SET_EXPENSE,
  REMOVE_ID,
  ATT_VALUE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state };
  case GET_DATA:
    return { ...state,
      currencies: Object.keys(action.data)
        .filter((currencie) => currencie !== 'USDT') };
  case API_ERROR:
    return { ...state, error: action.error };
  case TOTAL:
    return { ...state, totalExpenses: state.totalExpenses + action.amount };
  case SET_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case REMOVE_ID:
    return { ...state,
      expenses: state.expenses
        .filter((expense) => expense.id !== action.id) };
  case ATT_VALUE:
    return {
      ...state,
      totalExpenses: state.expenses.reduce((acc, cur) => {
        const { value, exchangeRates, currency } = cur;
        acc += (value * exchangeRates[currency].ask);
        return acc;
      }, 0),
    };
  default:
    return state;
  }
};

export default wallet;
