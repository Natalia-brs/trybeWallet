import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state, ...action.payload };

  default:
    return state;
  }
};

export default user;
