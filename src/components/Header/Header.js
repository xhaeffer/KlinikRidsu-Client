import React, { useState, useEffect, useRef } from 'react';

import './Header.css';

function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const menuIconRef = useRef(null);
  const menuListRef = useRef(null);
  const userInfoRef = useRef(null);

  useEffect(() => {
    const loggedIn = checkUserLoginStatus();
    if (loggedIn) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/userData/byID', { credentials: 'include' });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  useEffect(() => {
    const handleDocumentClick = (event) => {
      const isMenu = menuListRef.current && menuListRef.current.contains(event.target);
      const isUserInfo = userInfoRef.current && userInfoRef.current.contains(event.target);
      const isIcon = menuIconRef.current && menuIconRef.current.contains(event.target);

      if (isMenuOpen && !isMenu && !isUserInfo && !isIcon) {
        setMenuOpen(false);
        menuListRef.current.classList.remove('show');
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

  useEffect(() => {
    if (isMenuOpen) {
      menuListRef.current.classList.add('show');
    } else {
      menuListRef.current.classList.remove('show');
    }
  }, [isMenuOpen]);
  
  return (
    <div className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className="menu-icon" id="menu-icon" ref={menuIconRef} onClick={() => toggleMenu()}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className="menu" id="menu" ref={menuListRef}>
        <div id="user-info" style={{ display: 'block' }} ref={userInfoRef}>
          <img src={require('../../assets/images/kosong.jpeg')} id="profile-image" alt="Profile" />
          <div className="user-info">
            <p id="greeting">{getGreeting()}</p>
            <p id="user-name">{userData?.user.nama || 'Anda belum login'}</p>
            <p id="user-no-rs">{userData?.user.no_rs || 'Silahkan login terlebih dahulu'}</p>
          </div>
        </div>

        <div className="menu-list">
          <li><a href="/">&gt; Beranda</a></li>
          <li><a href="about">&gt; Tentang Kami</a></li>
          <li><a href="jadwal">&gt; Jadwal Dokter</a></li>
          <li>
            <span>&gt; Reservasi</span>
            <ul className="submenu">
              <li><a href="reservasi">&gt; Reservasi Dokter</a></li>
              <li><a href="cekreservasi">&gt; Cek Reservasi</a></li>
            </ul>
          </li>
          <li id="login-logout" style={{ display: checkUserLoginStatus() ? 'none' : 'block' }}><a href="/login">&gt; LOG IN</a></li>
          <li id="login-logout" style={{ display: checkUserLoginStatus() ? 'block' : 'none' }}><a href="/logout">&gt; LOG OUT</a></li>
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
  const userSession = getSession("user");

  return userSession !== null && userSession !== undefined;
}

function getSession(key) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${key}=`);

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

export default Header;
