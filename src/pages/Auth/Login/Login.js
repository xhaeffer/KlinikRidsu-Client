import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleReCaptcha  } from 'react-google-recaptcha-v3';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Alert from '../../../components/Alert/Alert';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(location.state?.message || '');
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [recaptchaScore, setRecaptchaScore] = useState(null);

  useEffect(() => {
    document.title = 'Login Pasien - Klinik Ridsu';
  }, []);

  useEffect(() => {
    const hasSession = document.cookie.includes('user');
    if (hasSession) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();

      formData.append('identifier', identifier);
      formData.append('password', password);
      formData.append('recaptchaResponse', recaptchaScore);

      // const response = await fetch('http://xhaeffer.me:11121/login', {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': document.cookie,
        },
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Data:', errorData);
        setError(errorData.error);
        setShowAlert(true);
        throw new Error(errorData.error);
      }

      const successData = await response.json();
      setSuccessMessage(successData.message);
      setShowAlert(true);

      const previousPage = localStorage.getItem('previousPage');
      if (previousPage) {
        navigate(previousPage);
        localStorage.removeItem('previousPage');
      } else {
        navigate('/');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <Header />

      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" action="/login" method="post" onSubmit={handleLogin}>
          <label>No RS / NIK:</label>
          <input type="text" name="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="No RS / NIK" required/>
          <br />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
          <br />
          <GoogleReCaptcha onVerify={(token) => setRecaptchaScore(token)} />
          <button type="submit" onClick={handleLogin}> Login </button>
          <p></p>
          <sup>Lupa Password? Hubungi Call Center</sup>
        </form>
      </div>

      {showAlert && (
      <Alert type={error ? "alert-danger" : "alert-success"} message={error || successMessage} onClose={closeAlert} />
      )}
      
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    
      <Footer />
    </div>
  );
}

export default Login;
