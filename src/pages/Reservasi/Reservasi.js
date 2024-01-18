import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import './Reservasi.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PersonalInfoCard from './PersonalInfo';
import AppointmentInfoCard from './AppointmentInfo';
import PaymentInfoCard from './PaymentInfo';
import IdentitasDokter from './IdentitasDokter';


const Reservasi = () => {
  const [selectedPoli, setSelectedPoli] = useState(null);
  const [selectedDokter, setSelectedDokter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handlePoliChange = (poli) => setSelectedPoli(poli);
  const handleDokterChange = (dokter) => setSelectedDokter(dokter);
  const handleDateChange = (date) => setSelectedDate(date);
  // console.log('Props from parent:', { poliList, selectedPoli, dokterList, selectedDokter, selectedDate });

  const navigate = useNavigate();
  const [recaptchaScore, setRecaptchaScore] = useState(null);

  useEffect(() => {
    const hasSession = document.cookie.includes('user');

    if (!hasSession && window.location.pathname !== '/login') {
      localStorage.setItem('previousPage', window.location.pathname);
      navigate('/login', { state: { message: 'Anda harus login terlebih dahulu!' } });
    }
  }, [navigate]);

  useEffect(() => {
    console.log('Selected Poli:', selectedPoli);
    console.log('Selected Dokter:', selectedDokter);
    console.log('Selected Date:', selectedDate);
  }, [selectedPoli, selectedDokter, selectedDate]);

  const submitReservasi = async (event) => {
    event.preventDefault();

    console.log('Submit Reservasi Triggered');
    console.log('Selected Poli:', selectedPoli);
    console.log('Selected Dokter:', selectedDokter);
    console.log('Selected Date:', selectedDate);

    if (!selectedPoli || !selectedDokter || !selectedDate) {
      alert('Silakan lengkapi informasi kunjungan terlebih dahulu.');
      return;
    }

    const formData = {
      no_rs: Number(document.getElementsByName('NoRS')[0].value),
      nik: Number(document.getElementsByName('NIK')[0].value),
      nama: document.getElementsByName('Nama')[0].value,
      tgl_lahir: document.getElementsByName('TglLahir')[0].value,
      jenis_kelamin: document.getElementsByName('JenisKelamin')[0].value,
      poli: selectedPoli,
      dokter: selectedDokter,
      tgl_kunjungan: selectedDate,
      pembayaran: document.getElementsByName('Pembayaran')[0].value,
      no_asuransi: document.getElementsByName('NoAsuransi')[0].value,
      no_telp: document.getElementsByName('NoTelp')[0].value,
      email: document.getElementsByName('Email')[0].value,
      recaptchaResponse: recaptchaScore,
    };

    console.log('Form Data (JSON):', JSON.stringify(formData));

    try {
      // const response = await fetch('http://xhaeffer.me:11121/api/reservasi'
      const response = await fetch('http://localhost:8080/api/reservasi', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }

      alert('Reservasi Berhasil!');
    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="head-reservasi">
        <h1>Reservasi</h1>
      </div>
      <form className="body-reservasi" onSubmit={submitReservasi}>
        <PersonalInfoCard />
        <AppointmentInfoCard
          poliList={poliList}
          selectedPoli={selectedPoli}
          dokterList={dokterList}
          selectedDokter={selectedDokter}
          selectedDate={selectedDate}
          handlePoliChange={handlePoliChange}
          handleDokterChange={handleDokterChange}
          handleDateChange={handleDateChange}
        />
        <PaymentInfoCard />
        <IdentitasDokter />
        {/* <GoogleReCaptcha onVerify={(token) => setRecaptchaScore(token)} /> */}
        <button type="submit" className="tbl-hijau" name="daftar" onClick={submitReservasi}> RESERVASI </button>
      </form>
      <Footer />
    </>
  );
};

export default Reservasi;
