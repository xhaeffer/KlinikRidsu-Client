import React from 'react';

const AppointmentInfoCard = ({ poliList, dokterList }) => {
  return (
    <div className="body-reservasi" id="appointmentInfoCard">
      <h2>Informasi Kunjungan</h2>
      <div className="form-grup">
        <label>Poli</label>
        <select name="Poli" id="poliDropdown">
          <option value="" disabled>Select Poli</option>
          {poliList.map((poli, index) => (
            <option key={index} value={poli}>
              {poli}
            </option>
          ))}
        </select>
      </div>
      <div className="form-grup">
        <label>Dokter</label>
        <select name="Dokter" id="dokterDropdown">
          <option value="" disabled>Select Dokter</option>
          {dokterList.map((dokter, index) => (
            <option key={index} value={dokter}>
              {dokter}
            </option>
          ))}
        </select>
      </div>
      <div className="form-grup">
        <label>Tanggal Kunjungan</label>
        <input type="date" name="TglKunjungan" id="tanggalKunjungan" />
      </div>
      <p></p>
    </div>
  );
};

export default AppointmentInfoCard;
