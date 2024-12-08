import React, { useState } from 'react';
import './Login.css';

const Login: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Only used in sign-up

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      console.log('Sign In:', { email, password });
    } else {
      console.log('Sign Up:', { username, email, password });
    }

    setEmail('');
    setPassword('');
    setUsername('');



    if (!email || !password || (!isSignIn && !username)) {
        alert('Please fill out all fields!');
        return;
      }
      
  };

  



  return (
    <div className="login-page">
      {/* Black half */}
      <div className="black-half">
        <h1>Annotation Tool</h1>
      </div>

      {/* White half */}
      <div className="white-half">
        {/* Tabs for Sign In and Sign Up */}
        <div className="tabs">
          <button
            className={`tab ${isSignIn ? 'active' : ''}`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`tab ${!isSignIn ? 'active' : ''}`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <h2>{isSignIn ? 'Sign In' : 'Create an Account'}</h2>

          {/* Sign Up Form (only show when isSignIn is false) */}
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

          {/* Common fields for Sign In and Sign Up */}
          <span>What's your email?</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <span>{isSignIn ? 'Your password' : 'Create a password'}</span>
          <input
            type="password"
            placeholder={isSignIn ? 'Enter your password' : 'Create your password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button type="submit">{isSignIn ? 'Sign In' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;