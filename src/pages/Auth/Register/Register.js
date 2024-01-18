import React, { useState } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import Alert from '../../../components/Alert/Alert';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ nama: '', nik: '', jenis_kelamin: '', email: '', password: '', confirm_password: '', phone: '' });
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    try {
      // const response = await fetch('http://xhaeffer.me:11121/register', {
      const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration error:', errorData);
        setError(errorData.error);
        setShowAlert(true);
        throw new Error(errorData.error);
      }
  
      const successData = await response.json();
      setSuccessMessage(successData.message);
      setShowAlert(true);

    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
        <Header />
        <div className="register-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <input type="text" name="nik" placeholder="NIK" value={formData.nik} onChange={handleChange} required />
                <input type="text" name="nama" placeholder="Nama" value={formData.nama} onChange={handleChange} required />
                <input type="text" name="jenis_kelamin" placeholder="Jenis Kelamin" value={formData.jenis_kelamin} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="password" name="confirm_password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} required />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>

        {showAlert && (
        <Alert type={error ? "alert-danger" : "alert-success"} message={error || successMessage} onClose={closeAlert} />
        )}

        <Footer />
    </div>
  );
};

export default Register;
