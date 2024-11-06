'use client';
import React, { useState } from 'react';
import './signup.css';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/user/register', { name, email, password });

      if (response.data.success) {
        // Store the token in cookies
        Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'Strict' });

        // Redirect to the home page after successful signup
        router.push('/signin');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="body">
      <div className="background-image">
        <div className="card">
          <img src="/img/cross-ash.svg" alt="Close" className="close-icon" />
          <h2 className="heading">Sign Up</h2>
          <form className="input-field-wrapper" onSubmit={handleSignUp}>
            <p className="in-name">Name</p>
            <input
              type="text"
              placeholder=""
              className="input-field"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p className="in-name">Email or Phone Number</p>
            <input
              type="text"
              placeholder=""
              className="input-field"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="in-name">Password</p>
            <div className="password-field">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                placeholder=""
                className="input-field"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src="/img/eye.svg"
                alt="Show Password"
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
                style={{ cursor: 'pointer' }}
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="sign-up-button">Sign Up</button>
            <p className="sign-in-text">
              Already have an account? <Link href="/signin" className="sign-in-link">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
