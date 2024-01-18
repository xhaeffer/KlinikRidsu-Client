import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './About.css';

const AboutUs = () => {
  useEffect(() => {
    document.title = 'About Us - Klinik Ridsu';
  }, []);

  return (
    <div>
      <Header />

      <div className="head-about">
        <img src={require('../../assets/images/klinik.jpg')} alt="Klinik Ridsu" width="800" />
      </div>

      <div className="body-about">
        <section id="informasi-rumah-sakit">
          <h2>Informasi Klinik</h2>
          <p>
            Klinik RIDSU adalah Klinik terkemuka yang menyediakan layanan kesehatan berkualitas kepada masyarakat.
            Kami berkomitmen untuk memberikan perawatan medis terbaik kepada pasien kami.
          </p>
          <p>Alamat: Jl. Kelapa 2 no.134, Depok, Jawa Barat.</p>
          <p>Telepon: (021) 14045</p>
        </section>

        <section id="layanan-kesehatan">
          <h2>Layanan Kesehatan</h2>
          <ul>
            <li>Pelayanan Gawat Darurat 24/7</li>
            <li>Unit Rawat Inap</li>
            <li>Poli Konsultasi Dokter Umum dan Spesialis</li>
            <li>Laboratorium Medis</li>
          </ul>
        </section>

        <section id="jam-besuk-pasien">
          <h2>Jam Besuk Pasien</h2>
          <table>
            <thead>
              <tr>
                <th>Hari</th>
                <th>Jam Buka</th>
                <th>Jam Tutup</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Senin - Jumat</td>
                <td>08:00</td>
                <td>17:00</td>
              </tr>
              <tr>
                <td>Sabtu</td>
                <td>09:00</td>
                <td>13:00</td>
              </tr>
              <tr>
                <td>Minggu</td>
                <td>Libur</td>
                <td>Libur</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
