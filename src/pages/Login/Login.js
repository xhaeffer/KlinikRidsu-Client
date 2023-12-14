import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Login.css';

function Login() {
  useEffect(() => {
    document.title = 'Login Pasien - Klinik Ridsu';})

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const formData = new URLSearchParams();
        formData.append('identifier', identifier);
        formData.append('password', password);
        
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      console.log('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <Header />

      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" action="/login" method="post">
          <label>No RS / NIK:</label>
          <input
            type="text"
            name="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="No RS / NIK"
            required
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <br />
          <button type="button" onClick={handleLogin}>
            Login
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {/* Uncomment the lines below if you want to include a registration link */}
          {/* <p>Don't have an account? </p>
            <a href="/register" className="btn">Register</a> */}
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
