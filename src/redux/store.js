import { legacy_createStore as createStore } from 'redux';
import user from './reducers/user';

const store = createStore(user);

if (window.Cypress) {
  window.store = store;
}

export default store;
