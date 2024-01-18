import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Jadwal.css';

const JadwalDokter = () => {
  useEffect(() => {
    document.title = 'Jadwal Dokter - Klinik Ridsu';})

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://xhaeffer.me:11121/api/jadwal');
        const response = await fetch('http://localhost:8080/api/jadwal');
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }

        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false); 
      } catch (error) {
        console.error(error);
        setError('Terjadi kesalahan saat mengambil data');
        setLoading(false);
      }
    };

    fetchData();
  }, []); //

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading-container">
          <div className="loader"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      
    <div>
      <Header />
      <p style={{top: "100px", textAlign: "center", position: 'relative', minHeight: '82vh'}}>Error: <br /> {error}</p>
      <Footer />
    </div>
    );
  };
  
  return (
    <div>
      <Header />
      <div className="head-jadwal">
        <h1>Jadwal Dokter</h1>
      </div>

      <div className="body-jadwal">
        {data.map((dokter) => (
          <div key={dokter.nama_dokter} className="card">
            <h2>{dokter.nama_dokter}</h2>
            <h3>Poli: {dokter.poli}</h3>
            <div className="data">
              <img src={`data:image/png;base64,${dokter.gambar}`} width="300" alt={dokter.nama_dokter} />
              <table>
                <thead>
                  <tr>
                    <th>Hari</th>
                    <th>Jam Mulai</th>
                    <th>Jam Selesai</th>
                  </tr>
                </thead>
                <tbody>
                  {dokter.JadwalDokter.map((jadwal) => (
                    <tr key={jadwal.hari}>
                      <td>{jadwal.hari}</td>
                      <td>{jadwal.jam_mulai || '-'}</td>
                      <td>{jadwal.jam_selesai || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a 
                href={`reservasi?nama=${encodeURIComponent(dokter.nama_dokter)}&poli=${encodeURIComponent(dokter.poli)}`}
                className="btn" 
                onClick={(e) => handleReservasiClick(e, dokter.nama_dokter, dokter.poli)}
              >
                Reservasi
              </a>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

function handleReservasiClick(event, namaDokter, poli) {
  event.preventDefault();
  
  // Lakukan pengalihan ke halaman reservasi
  window.location.href = `reservasi?nama=${encodeURIComponent(namaDokter)}&poli=${encodeURIComponent(poli)}`;
}

export default JadwalDokter;
