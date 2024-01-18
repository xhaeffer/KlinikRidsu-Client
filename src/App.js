import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Jadwal from './pages/Jadwal/Jadwal';
import Reservasi from './pages/Reservasi/Reservasi';
import CekReservasi from './pages/CekReservasi/CekReservasi';
import Login from './pages/Auth/Login/Login';
import Logout from './pages/Auth/Logout/Logout';
import Register from './pages/Auth/Register/Register';


function App() {
  return (
    <Router>
      <GoogleReCaptchaProvider reCaptchaKey="6LeaVFApAAAAAGVIntBfOhswc9tQhnVHYeZSmjs2" scriptProps={{async: false, defer: false, appendTo: 'body'}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/jadwal" element={<Jadwal />} />
        <Route path="/reservasi" element={<Reservasi />} />
        <Route path="/cekreservasi" element={<CekReservasi />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </GoogleReCaptchaProvider>
    </Router>
  );
}

export default App;
