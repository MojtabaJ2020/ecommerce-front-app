import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../../store/auth/authActions';
import { OAUTH_LOGIN_SUCCESS } from '../../store/auth/authActionTypes';

export const AuthSuccessHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isAuthenticated, error } = useSelector((state) => state.auth); 

  useEffect(() => {
    dispatch({ type: OAUTH_LOGIN_SUCCESS, payload: "logged in successfuly" });
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user) {
        navigate('/');
      } else if (error) {
        navigate('/login');
      }
    }
  }, [user, isAuthenticated, error, navigate]);

};

export default AuthSuccessHandler;