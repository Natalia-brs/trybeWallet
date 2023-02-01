export const LOGIN = 'LOGIN';
export const REQUEST_API = 'REQUEST_API';
export const GET_DATA = 'GET_DATA';
export const API_ERROR = 'API_ERROR';

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const apiRequest = () => ({
  type: REQUEST_API,
});

export const getData = (data) => ({
  type: GET_DATA,
  data,
});

export const apiError = (error) => ({
  type: API_ERROR,
  error,
});

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
