import { API_ERROR, REQUEST_API, GET_DATA } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],

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

  default:
    return state;
  }
};

export default wallet;
