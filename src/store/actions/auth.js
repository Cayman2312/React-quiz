import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let URL =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD2Ugu2L-OBoPuTwwoONz0yA11-kLSvvwY';
    if (isLogin) {
      //если нужен логин
      URL =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2Ugu2L-OBoPuTwwoONz0yA11-kLSvvwY';
    }

    const response = await axios.post(URL, authData);
    const data = response.data;

    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('iserId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    dispatch(authSuccess(data.idToken));

    dispatch(autoLogout(data.expiresIn));
  };
}
export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('iserId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}