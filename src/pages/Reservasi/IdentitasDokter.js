import React from 'react';

const IdentitasDokter = ({ dokterData = {} }) => {
  const { nama, poli, jadwalDokter } = dokterData;
  console.log(dokterData);

  return (
    <div className="identitas-dokter" id="doctorCard">
      <h2>{nama}</h2>
      <h3>Poli: {poli}</h3>
      <div className="event">
        <img src={require('../../assets/images/kosong.jpeg')} width="300" alt="Default" />
        <table>
          <thead>
            <tr>
              <th>Hari</th>
              <th>Jam Mulai</th>
              <th>Jam Selesai</th>
            </tr>
          </thead>
          <tbody>
            {jadwalDokter && Array.isArray(jadwalDokter) && jadwalDokter.map((jadwal, index) => (
              <tr key={index}>
                <td>{jadwal.Hari_Praktek}</td>
                <td>{jadwal.JamMulai || '-'}</td>
                <td>{jadwal.JamSelesai || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IdentitasDokter;
