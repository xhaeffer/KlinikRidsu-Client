import React, { useState, useEffect, useRef } from 'react';

import './Header.css';

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const menuIconRef = useRef(null);
  const menuListRef = useRef(null);
  const userInfoRef = useRef(null);

  useEffect(() => {
    const loggedIn = checkUserLoginStatus();
    setLoggedIn(loggedIn);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const isMenu = menuListRef.current && menuListRef.current.contains(event.target);
      const isUserInfo = userInfoRef.current && userInfoRef.current.contains(event.target);
      const isIcon = menuIconRef.current && menuIconRef.current.contains(event.target);

      if (isMenuOpen && !isMenu && !isUserInfo && !isIcon) {
        setMenuOpen(false);
        menuListRef.current.classList.remove('show');
      } else {
        menuListRef.current.classList.toggle('show');
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuListRef, userInfoRef, menuIconRef, isMenuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prevMenuState) => !prevMenuState);
  };

  return (
    <div className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className="menu-icon" id="menu-icon" ref={menuIconRef} onClick={() => toggleMenu()}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className="menu" id="menu" ref={menuListRef}>
        <div id="user-info" style={{ display: isLoggedIn ? 'block' : 'block' }} ref={userInfoRef}>
          <img src={require('../../assets/images/kosong.jpeg')} id="profile-image" alt="Profile Image" />
          <div className="user-info">
            <p id="greeting">{getGreeting()}</p>
            <p id="user-name">{isLoggedIn ? 'Nama Pengguna' : 'Anda belum login'}</p>
            <p id="user-no-rs">{isLoggedIn ? 'No RS: RS12345' : 'Silahkan login terlebih dahulu'}</p>
          </div>
        </div>

        <div className="menu-list">
          <li><a href="/">HOME</a></li>
          <li><a href="about">ABOUT US</a></li>
          <li><a href="jadwal">FIND DOCTOR</a></li>
          <li>
            <span>APPOINTMENT</span>
            <ul className="submenu">
              <li><a href="reservasi">BOOK APPOINTMENT</a></li>
              <li><a href="cekreservasi">CHECK APPOINTMENT</a></li>
            </ul>
          </li>
          <li id="login-menu"><a href="/login">LOGIN</a></li>
          <li id="logout-menu" style={{ display: isLoggedIn ? 'block' : 'none' }}><a href="/logout">LOGOUT</a></li>
        </div>
      </ul>
    </div>
  );
}

function getGreeting() {
  const currentTime = new Date().getHours();
  let greetingMessage = "Selamat ";

  if (currentTime < 12) {
    greetingMessage += "Pagi";
  } else if (currentTime < 18) {
    greetingMessage += "Siang";
  } else {
    greetingMessage += "Malam";
  }

  return greetingMessage;
}

function checkUserLoginStatus() {
  const token = getCookie("token"); // Change "token" to the appropriate cookie name
  const userSession = getSession("user"); // Change "user" to the appropriate session name

  // Adjust the logic based on your needs
  return token !== null && token !== undefined && token !== "" && userSession !== null && userSession !== undefined;
}

function getSession(key) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);

  if (parts.length === 2) {
    return JSON.parse(parts.pop().split(';').shift());
  }

  return null;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }

  return null;
}

export default Header;
