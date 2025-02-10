import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../styles/LoginPage.css';
import { login, oauthLogin, fetchCurrentUser } from '../store/auth/authActions';
import { useSelector, useDispatch } from 'react-redux';
import { USER_INACTIVE } from '../constants/ErrorCode';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userInactive, setUserInactive] = useState (false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {user, isAuthenticated, error } = useSelector((state) => state.auth);

  const handleTraditionalLogin = async (event) => {
    event.preventDefault();
    const credentials = { username, password };
    dispatch(login(credentials));
  };

  useEffect(() => {
    if (isAuthenticated && !error) {
      dispatch(fetchCurrentUser());
    }else if (error)
    {
      setErrorMessage(error.message);
    }
    setUserInactive(error && error.errorCode === USER_INACTIVE);
    console.log(userInactive);
    console.log(error)
  }, [isAuthenticated, error, dispatch]);

  useEffect(() => {
    if (!isAuthenticated)
    {
      return;
    }
    if(user) {
      navigate('/');
    }
  }, [user,isAuthenticated, dispatch, navigate]);


  const handleOAuthLogin = (provider) => {
    dispatch(oauthLogin(provider));
  };

  return (
    <div className="login-container">
      <h1>Login to Your Account</h1>
      <form onSubmit={handleTraditionalLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {userInactive && <Link to="/send-activation-token">Send activation code</Link>}
        <button type="submit" className="login-btn">Login</button>
      </form>

      <div className="oauth-section">
        <p>Or login using:</p>
        <button className="oauth-btn google-btn" onClick={() => handleOAuthLogin('google')}>Login with Google</button>
        <button className="oauth-btn github-btn" onClick={() => handleOAuthLogin('github')}>Login with GitHub</button>
      </div>
    </div>
  );
}

export default LoginPage;
