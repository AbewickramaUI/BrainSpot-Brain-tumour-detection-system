import React, { useState } from 'react';
import './login.css';
import RegisterModal from './RegisterModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [user, setUser] = useState()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/user/login', { username, password });
      console.log(response.data.alert); // Should be "Login successful."
      setUser(response.data)
      localStorage.clear();
      localStorage.setItem("token","Bearer "+response.data.accessToken)
      localStorage.setItem('level',response.data.level)
      localStorage.setItem('user', response.data.uname)
      console.log(response.data)
      setLoginError('');
      navigate('/upload')
      window.location.reload();
      
    } catch (error) {
      console.error(error);
      
      alert('Invalid credentials! Please check the username and the password');
    }
  };

  return (
    <div className="login-form-container text">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {loginError && <div className="error-message">{loginError}</div>}
      <RegisterModal />
    </div>
  );
};

export default LoginForm;

