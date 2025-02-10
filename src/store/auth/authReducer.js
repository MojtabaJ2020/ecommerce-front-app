
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
    FETCH_CURRENT_USER_FAILURE,
    FETCH_CURRENT_USER_SUCCESS,
    FETCH_CURRENT_USER_REQUEST
  } from './authActionTypes';

  import { INITIAL, SUCCESS, FAILED } from '../../constants/RefreshTokenStatus';
  
  const initialState = {
    isAuthenticated: false,
    user: null,
    lastRefreshTokenStatus: INITIAL,
    isLoading: false,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case OAUTH_LOGIN_REQUEST:
      case LOGOUT_REQUEST:
      case REFRESH_TOKEN_REQUEST:
      case FETCH_CURRENT_USER_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };

      case LOGIN_SUCCESS:
      case OAUTH_LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        };

      case REFRESH_TOKEN_SUCCESS:
        return {
          ...state,
          lastRefreshTokenStatus: SUCCESS,
          isLoading: false,
          error: null,
        };

      case FETCH_CURRENT_USER_SUCCESS:
        return {
          ...state,
          user: action.payload,
          isLoading: false,
          error: null,
        };
  
      case LOGOUT_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          lastRefreshTokenStatus: INITIAL,
          isLoading: false,
          error: null,
        };

      case LOGIN_FAILURE:
      case OAUTH_LOGIN_FAILURE:
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          error: action.payload,
        };

      case LOGOUT_FAILURE:  
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

      case REFRESH_TOKEN_FAILURE:
        return {
          ...state,
          lastRefreshTokenStatus: FAILED,
          isLoading: false,
          error: action.payload,
        };
      case FETCH_CURRENT_USER_FAILURE:
        return {
          ...state,
          user: null,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;