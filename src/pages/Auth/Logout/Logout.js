import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // const response = await fetch('http://xhaeffer.me:11121/logout', { method: 'GET', credentials: 'include' });
        const response = await fetch('http://localhost:8080/logout', { method: 'GET', credentials: 'include' });

        if (response.ok) {
          navigate('/login');
        } else {
          console.error('Logout failed:', response.statusText);
          navigate('/');
        }
      } catch (error) {
        console.error('Error during logout:', error);
        navigate('/login', { state: { message: 'Anda harus login terlebih dahulu!' } });
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="loader"></div>
    </div>
  );
};

export default Logout;
