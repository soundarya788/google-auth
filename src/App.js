import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const responseGoogle = (response) => {
    if (response.profileObj) {
      setIsLoggedIn(true);
      setUserInfo(response.profileObj);
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="app">
      <h1 className="title">Google Authentication Example</h1>
      {isLoggedIn ? (
        <div className="dashboard">
          <p>Welcome, {userInfo.name}!</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <p>Data fetched using Axios: {data ? data.title : 'Loading...'}</p>
        </div>
      ) : (
        <div className="login-container">
          {isSignup ? (
            <>
              <p className="login-message">Sign up with Google:</p>
              <GoogleLogin
                clientId="809153744453-rf58rhlhs0609agdc9q2u1uhe6v892ie.apps.googleusercontent.com"
                buttonText="Sign up with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              <p className="signup-message">
                Already have an account?{' '}
                <button className="toggle-button" onClick={toggleSignup}>
                  Login instead
                </button>
              </p>
            </>
          ) : (
            <>
              <p className="login-message">Login with Google:</p>
              <GoogleLogin
                clientId="809153744453-rf58rhlhs0609agdc9q2u1uhe6v892ie.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
              <p className="signup-message">
                Don't have an account?{' '}
                <button className="toggle-button" onClick={toggleSignup}>
                  Sign up instead
                </button>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
