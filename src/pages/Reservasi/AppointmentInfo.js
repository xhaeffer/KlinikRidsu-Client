import React, { useEffect, useState } from 'react';
import IdentitasDokter from './IdentitasDokter';

const AppointmentInfo = () => {
  useEffect(() => {
    document.title = 'Reservasi Dokter - Klinik Ridsu';
  }, []);

  const [poliList, setPoliList] = useState([]);
  const [selectedPoli, setSelectedPoli] = useState('');
  const [dokterList, setDokterList] = useState([]);
  const [selectedDokter, setSelectedDokter] = useState('');
  const [dokterData, setDokterData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchPoliData = async () => {
      try {
        // const response = await fetch('http://xhaeffer.me:11121/api/jadwal/byPoli', { credentials: 'include' });
        const response = await fetch('http://localhost:8080/api/jadwal/byPoli', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Failed to fetch poli list');
        }
        const data = await response.json();

        setPoliList(data);
      } catch (error) {
        console.error('Error fetching poli:', error);
      }
    };

    fetchPoliData();
  }, []);

  const handlePoliChange = async (event) => {
    const selectedPoli = event.target.value;
    setSelectedPoli(selectedPoli);

    console.log('Updated Selected Poli:', selectedPoli);

    try {
      // const response = await fetch(`http://xhaeffer.me:11121/api/jadwal/byPoli/${selectedPoli}`, {credentials: 'include'})
      const response = await fetch(`http://localhost:8080/api/jadwal/byPoli/${selectedPoli}`, { credentials: 'include' });
      if (!response.ok) {
        throw new Error('Failed to fetch dokter list');
      }
      const data = await response.json();

      setDokterList(data);
      console.log('Updated Dokter List:', data);
    } catch (error) {
      console.error('Error fetching dokter:', error);
    }
  };

  const handleDokterChange = async (event) => {
    const selectedDokter = event.target.value;
    setSelectedDokter(selectedDokter);

    console.log('Updated Selected Dokter:', selectedDokter);


    const selectedDokterObject = dokterList.find(dokter => dokter.nama_dokter === selectedDokter);

    try {
        const response = await fetch(`http://localhost:8080/api/jadwal/byID/${selectedDokterObject.id_dokter}`, { credentials: 'include' });

        if (!response.ok) {
            throw new Error('Failed to fetch additional dokter data');
        }

        const additionalData = await response.json();
        setDokterData(additionalData);

    } catch (error) {
        console.error('Error fetching additional dokter data:', error);
    }
};


  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate); 

    console.log('Updated Selected Date:', selectedDate);

  };

  useEffect(() => {
    console.log('Selected Poli:', selectedPoli);
    console.log('Selected Dokter:', selectedDokter);
    console.log('Dokter Data:', dokterData);
    console.log('Selected Date:', selectedDate);
  }, [selectedPoli, selectedDokter, selectedDate, dokterData]);

  return (
    <div>
      <div className="card-reservasi" id="appointmentInfoCard">
        <h2>Informasi Kunjungan</h2>
        <div className="form-grup">
          <label>Poli</label>
          <select name="Poli" id="poliDropdown" value={selectedPoli} onChange={(event) => handlePoliChange(event)}>
            <option value="" disabled>Select Poli</option>
            {Array.isArray(poliList) &&
              poliList.map((poli, index) => (
                <option key={index} value={poli}>
                  {poli}
                </option>
              ))}
          </select>
        </div>
        <div className="form-grup">
          <label>Dokter</label>
          <select name="Dokter" id="dokterDropdown" value={selectedDokter} onChange={(event) => handleDokterChange(event)}>
            <option value="" disabled>Pilih Dokter</option>
            {dokterList.map((dokter, index) => (
              <option key={index} value={dokter.nama_dokter}>{dokter.nama_dokter}</option>
            ))}
          </select>
          {dokterData && <IdentitasDokter dokterData={dokterData} />}
        </div>
        <div className="form-grup">
          <label>Tanggal Kunjungan</label>
          <input type="date" name="TglKunjungan" id="tanggalKunjungan" value={selectedDate} onChange={(event) => handleDateChange(event)} />
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default AppointmentInfo;
