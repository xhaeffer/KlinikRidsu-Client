import React, { useEffect, useState } from 'react';

const PersonalInfo = () => {
  const [userData, setUserData] = useState({
    NoRS: '',
    NIK: '',
    Nama: '',
    TglLahir: 'DD-MM-YYYY',
    JenisKelamin: '',
  });

  const getUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/userData/byID`, {credentials: 'include'});
      if (!response.ok) {
        throw new Error('Gagal mengambil data pengguna');
      }

      const userData = await response.json();
      setUserData(userData.user);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="card-reservasi" id="personalInfoCard">
      <h2>Informasi Personal</h2>
      <p>Mohon pastikan kembali bahwa data yang ditampilkan sesuai!</p>
      <div className="form-group">
        <label>No. Medical Record</label>
        <input type="text" name="NoRS" value={userData.no_rs} disabled />
      </div>
      <div className="form-group">
        <label>NIK</label>
        <input type="text" name="NIK" value={userData.nik} disabled />
      </div>
      <div className="form-group">
        <label>Nama</label>
        <input type="text" name="Nama" value={userData.nama} disabled />
      </div>
      <div className="form-group">
        <label>Tanggal Lahir</label>
        <input type="text" name="TglLahir" value={userData.tgl_lahir} disabled />
      </div>
      <div className="form-group">
        <label>Jenis Kelamin</label>
        <input type="text" name="JenisKelamin" value={userData.jenis_kelamin} disabled />
      </div>
      <p><sup>Laporkan ketidaksesuaian data ke Call Center</sup></p>
    </div>
  );
};

export default PersonalInfo;
