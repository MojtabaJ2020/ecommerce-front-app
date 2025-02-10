import api from '../../api/axiosInstance';
import { HttpStatusCode } from 'axios';
import { extractError } from '../../utils/ResponseUtil';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  OAUTH_LOGIN_REQUEST,
  OAUTH_LOGIN_SUCCESS,
  OAUTH_LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
} from './authActionTypes';

// Login Action
export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await api.post('login', credentials);
    if (response.status !== HttpStatusCode.Ok) { 
        throw new Error('Invalid credentials, please try again');
    }
    console.log(response)
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
  } catch (error) {
    console.log(error)
    dispatch({ type: LOGIN_FAILURE, payload: extractError (error.response.data) || error });
  }
};

// OAuth login action
export const oauthLogin = (provider) => (dispatch) => {
  dispatch({ type: OAUTH_LOGIN_REQUEST, payload: provider });
  let authUrl = '';
  switch (provider) {
    case 'google':
      authUrl = 'http://localhost:8080/oauth2/authorization/google';
      break;
    case 'github':
      authUrl = 'http://localhost:8080/oauth2/authorization/github';
      break;
    default:
      throw new Error('Unsupported OAuth provider');
  }
  window.location.href = authUrl;
};
// Fetch current user info
export const fetchCurrentUser = () => async (dispatch) => {
  dispatch({ type: FETCH_CURRENT_USER_REQUEST });
  try {
    const response = await api.get('api/v1/users/me');
    if (response.status !== HttpStatusCode.Ok) { 
        throw new Error('Could not fetch user info!');
    }
    dispatch({ type: FETCH_CURRENT_USER_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_CURRENT_USER_FAILURE, payload: error.message });
  }
};

// Logout Action
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    await api.post('logout');
  } catch (error) {
    console.log(error)
  }
  dispatch({ type: LOGOUT_SUCCESS, payload: null });
  // Optionally, remove tokens from cookies here
};

// Refresh Token Action
export const refreshToken = () => async (dispatch) => {
  dispatch({ type: REFRESH_TOKEN_REQUEST });
  try {
    const response = await api.post('refresh-token');
    dispatch({ type: REFRESH_TOKEN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: REFRESH_TOKEN_FAILURE, payload: error.message });
    dispatch(logout());
  }
};