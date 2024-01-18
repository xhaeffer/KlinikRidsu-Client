import React, { useState, useEffect, useCallback } from 'react';
import './Alert.css';

const Alert = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const closeAlert = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeAlert();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [closeAlert]);

  return (
    <div className={`alert ${type} ${isVisible ? 'visible' : ''}`}>
      <span className="message">{message}</span>
      <span className="close-button" onClick={closeAlert}>
        &#10006;
      </span>
    </div>
  );
};

export default Alert;
