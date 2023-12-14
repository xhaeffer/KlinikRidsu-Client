import React from 'react';

const PersonalInfoCard = () => {
  return (
    <div className="body-reservasi" id="personalInfoCard">
      <h2>Informasi Personal</h2>
      <p>Mohon pastikan kembali bahwa data yang ditampilkan sesuai!</p>
      <div className="form-group">
        <label>No. Medical Record</label>
        <input type="text" name="NoRS" placeholder="No. Medical Record" maxLength="10" pattern="\d{10}" required />
      </div>
      <div className="form-group">
        <label>NIK</label>
        <input type="text" name="NIK" placeholder="NIK" maxLength="16" pattern="\d{16}" required />
      </div>
      <div className="form-group">
        <label>Nama</label>
        <input type="text" name="Nama" placeholder="Nama" required />
      </div>
      <div className="form-group">
        <label>Tanggal Lahir</label>
        <input type="date" name="TglLahir" required />
      </div>
      <div className="form-group">
        <label>Jenis Kelamin</label>
        <select name="JenisKelamin">
          <option value="Pria">Pria</option>
          <option value="Wanita">Wanita</option>
        </select>
      </div>
      <p></p>
    </div>
  );
};

export default PersonalInfoCard;
