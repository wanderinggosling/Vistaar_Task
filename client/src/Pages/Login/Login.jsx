import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your custom CSS file for styling


const clientId = process.env.REACT_APP_CLIENT_ID;
const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Google login successful');
    localStorage.setItem('access_token', response.credential);
    
    navigate('/');
  };
  

  const handleLoginFailure = (error) => {
    console.error('Google login failed', error);
  };
  return (
    <div className="login-container"> {/* Apply custom CSS class for centering */}
      <div className="login-box"> {/* Container with border */}
        <h1>Login</h1>
          <div className='center-content '>
            <p>Click the button below to log in with your Google account:</p>
            <GoogleLogin
              clientId={clientId}
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
            />
          </div>
      </div>
    </div>
  );
};

export default Login;
