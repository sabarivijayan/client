'use client';
import React, { useState } from 'react';
import './signin.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/user/login', { email, password }, {
        withCredentials: true,
      });

      if (response.data.success) {
        Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' });
        router.push('/home');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage("Sign-in failed. Please try again.");
      console.error("Error: ", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="background-image">
      <div className="card">
        <img src="/img/cross-ash.svg" alt="Close" className="close-icon" />
        <h2 className="heading">Sign In</h2>
        <form className="input-field-wrapper" onSubmit={handleSignIn}>
          <p className="in-name">Email or Phone Number</p>
          <input
            type="text"
            className="input-field"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="in-name">Password</p>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              className="input-field"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? '/img/eye-off.svg' : '/img/eye.svg'}
              alt="Show Password"
              className="eye-icon"
              onClick={togglePasswordVisibility}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="sign-up-button">Sign In</button>
          <p className="sign-in-text">
            Don't have an account? <a href="/" className="sign-in-link">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
