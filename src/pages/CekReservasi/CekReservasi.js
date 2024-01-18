import React, { useState , useEffect, useCallback } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// import Alert from '../../components/Alert/Alert';
import UpdateReservasi from './UpdateReservasi';
import './CekReservasi.css';

function CekReservasi() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [resultData, setResultData] = useState([]);
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const [recaptchaScore, setRecaptchaScore] = useState(null);
  const { openUpdatePopup, submitUpdate , deleteReservasi, closePopup, UpdatePopup, updatePopupData, setUpdatePopupData} = UpdateReservasi({ recaptchaScore });

  useEffect(() => {
    document.title = 'Cek Reservasi - Klinik Ridsu';
  }, []);

  useEffect(() => {  
    const hasSession = document.cookie.includes('user');

    if (!hasSession && window.location.pathname !== '/login') {
      localStorage.setItem('previousPage', window.location.pathname);
      navigate('/login', { state: { message: 'Anda harus login terlebih dahulu!' } });
    } else {
      fetchUserData();
    }
  }, [navigate]);

  const handleVerify = useCallback((token) => {
    // console.log('Recaptcha token:', token);
    setRecaptchaScore(token);
  }, [setRecaptchaScore]);

  const fetchUserData = async () => {
    try {
      // const response = await fetch('http://xhaeffer.me:11121/api/userData/byID', { credentials: 'include' });
      const response = await fetch('http://localhost:8080/api/userData/byID', { credentials: 'include' });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUserData(userData);
      fetchReservasiData(userData.user.no_rs);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchReservasiData = async (noRS) => {
    try {
      // const response = await fetch(`http://xhaeffer.me:11121/api/reservasi/byNoRS/${noRS}`, { credentials: 'include' });
      const response = await fetch(`http://localhost:8080/api/reservasi/byNoRS/${noRS}`, { credentials: 'include' });

      if (!response.ok) {
        throw new Error('Failed to fetch reservasi data');
      }

      const data = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.tgl_kunjungan) - new Date(a.tgl_kunjungan));

      setResultData(sortedData);
    } catch (error) {
      console.error('Error fetching reservasi data:', error);
    }
  };

  const DetailCard = ({ reservasi, index }) => {
    const isReservasiSelesai = new Date(reservasi.tgl_kunjungan) < new Date();
    const showDetails = openCardIndex === index;

    const toggleDetails = (e) => {
      e.stopPropagation();
      setOpenCardIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    
    return (
      <div className="data-cekreservasi" onClick={(e) => toggleDetails(e)}>
      <div className="dataheader-cekreservasi">
        <h3>{reservasi.dokter}</h3>
        <p>{`Poli: ${reservasi.poli}`}</p>
        <div className={`datastatus-cekreservasi ${isReservasiSelesai ? 'selesai' : 'dijadwalkan'}`}>
          {isReservasiSelesai ? 'Selesai' : 'Dijadwalkan'}
        </div>
        <div className="arrow-button">{showDetails ? 'Tutup ▲' : 'Lebih Detail ▼'}</div>
      </div>

      {showDetails && (
        <div className="details">
          <table className="details-table">
            <tbody>
              <tr>
                <td>ID Reservasi:</td>
                <td>{reservasi.id_reservasi}</td>
              </tr>
              <tr>
                <td>Nomor RS:</td>
                <td>{reservasi.no_rs}</td>
              </tr>
              <tr>
                <td>NIK:</td>
                <td>{reservasi.nik}</td>
              </tr>
              <tr>
                <td>Tanggal Kunjungan:</td>
                <td>{reservasi.tgl_kunjungan}</td>
              </tr>
              <tr>
                <td>Nama:</td>
                <td>{reservasi.nama}</td>
              </tr>
              <tr>
                <td>Jenis Kelamin:</td>
                <td>{reservasi.jenis_kelamin}</td>
              </tr>
              <tr>
                <td>Tanggal Lahir:</td>
                <td>{reservasi.tgl_lahir}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{reservasi.email}</td>
              </tr>
              <tr>
                <td>Nomor Telepon:</td>
                <td>{reservasi.no_telp}</td>
              </tr>
              <tr>
                <td>Pembayaran:</td>
                <td>{reservasi.pembayaran}</td>
              </tr>
              {reservasi.pembayaran  !== 'Pribadi' && (
                      <tr>
                        <td>No Asuransi:</td>
                        <td>{reservasi.no_asuransi}</td>
                      </tr>
                    )}
            </tbody>
          </table>

          {!isReservasiSelesai && (
            <>
              <div className="dataactions-cekreservasi">
                <button className="hijau" onClick={(e) => {e.stopPropagation(); openUpdatePopup(reservasi.id_reservasi, setUpdatePopupData, recaptchaScore);}}>
                  Perbaiki Data / Jadwal Ulang
                </button>
                <button className="merah" onClick={(e) => {e.stopPropagation(); deleteReservasi(reservasi.id_reservasi, fetchReservasiData, userData, recaptchaScore);}}>
                  Batalkan Reservasi
                </button>
              </div>
            </>
          )}
        </div>
      )}
      </div>
    );
    
  };
  return (
  <div>
    <GoogleReCaptcha onVerify={handleVerify} />
    <Header />
    
    <div className="head-cekreservasi">
      <h1>Cek Reservasi</h1>
    </div>

    <div className="body-cekreservasi">
      <p style={{ display: resultData.length === 0 ? 'block' : 'none' }}> Data tidak ditemukan! </p>
      <div className="hasil-cekreservasi">
        {resultData.map((reservasi, index) => (
          <DetailCard key={index} reservasi={reservasi} index={index}/>
        ))}
      </div>

      {updatePopupData && (
        <UpdatePopup
          data={updatePopupData}  
          onUpdate={(updatedData) => submitUpdate(updatedData, userData, fetchReservasiData, closePopup, recaptchaScore)}
          onClose={(popupId) => closePopup(popupId)}
        />
      )}
    </div>

    <Footer />
  </div>
  );
  
};

export default CekReservasi;
