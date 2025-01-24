import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login , register } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (!isSignIn && !username)) {
      setErrorMessage('Please fill out all fields!');
      return;
    }

    try {
      if (isSignIn) {
        await login(email, password);
        setSuccessMessage('Login successful!');
        navigate('/dashboard');
      } else {
        await register(username, email, password);
        setSuccessMessage('Account created successfully!');
      }

      setEmail('');
      setPassword('');
      setUsername('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to connect to the server.');
    }
  };

  return (
    <div className="login-page">
      <div className="black-half">
        <h1>Annotation Tool</h1>
      </div>

      <div className="white-half">
        {/* Tabs for toggling between Sign In and Sign Up */}
        <div className="tabs">
          <button
            className={`tab ${isSignIn ? 'active' : ''}`}
            onClick={() => {
              setIsSignIn(true);
              setErrorMessage('');
              setSuccessMessage('');
            }}
          >
            Sign In
          </button>
          <button
            className={`tab ${!isSignIn ? 'active' : ''}`}
            onClick={() => {
              setIsSignIn(false);
              setErrorMessage('');
              setSuccessMessage('');
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Login/Signup Form */}
        <form onSubmit={handleSubmit}>
          <h2>{isSignIn ? 'Sign In' : 'Create an Account'}</h2>

          {/* Username input only for Sign Up */}
          {!isSignIn && (
            <>
              <span>What should we call you?</span>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </>
          )}

          {/* Email input */}
          <span>What's your email?</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input */}
          <span>{isSignIn ? 'Your password' : 'Create a password'}</span>
          <input
            type="password"
            placeholder={isSignIn ? 'Enter your password' : 'Create your password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error and Success Messages */}
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          {/* Submit Button */}
          <button type="submit">{isSignIn ? 'Sign In' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;