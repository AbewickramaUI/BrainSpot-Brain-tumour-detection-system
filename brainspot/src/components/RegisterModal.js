import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './login.css';
import { isValidEmail, isValidPassword, isValidUsername } from './formvalidation';

function RegisterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userlevel , setUserLevel] = useState('2')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUsernameBlur = async () => {
    try {
      const response = await axios.get('http://localhost:5001/user/chkusername', { username });
      const { exists } = response.data;
      setUsernameExists(exists);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailBlur = async () => {
    try {
      const response = await axios.get('http://localhost:5001/user/chkemail', { email });
      const { exists } = response.data;
      setEmailExists(exists);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (usernameExists) {
      alert('Username already exists');
      openModal();
      return;
    }

    if (emailExists) {
      alert('Email already exists');
      openModal();
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Invalid email format');
      return;
    }

    const passwordValidation = isValidPassword(password);

    if (!passwordValidation.valid) {
      if (passwordValidation.reason === 'short') {
        alert('Password must be at least 8 characters long');
      } else if (passwordValidation.reason === 'format') {
        alert('Password must contain at least one special character and one number');
      }

      openModal();
      return;
    }

    if (!isValidUsername(username)) {
      alert('Username should be atleast 6 characters');
      return;
    }

    axios.post('http://localhost:5001/user', { email, username, password , userlevel })
      .then((res) => {
        console.log("Registration successful");
        closeModal();
      })
      
  };

  return (
    <>
      <button type="button" className="register-button" onClick={openModal}>
        Register
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Register Modal"
      >
        <button className="submit-button" onClick={closeModal}>
          Close
        </button>
        <div className="login-form-container">
          <h2>Sign up</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" name="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              required
            />

            <label htmlFor="username" name="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={handleUsernameBlur}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default RegisterModal;


