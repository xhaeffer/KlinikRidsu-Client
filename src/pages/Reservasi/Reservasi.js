import React, { useEffect, useState } from 'react';
import ReservationForm from './ReservationForm';
import './Reservasi.css';

const Reservasi = () => {
  useEffect(() => {
    document.title = 'Reservasi Dokter - Klinik Ridsu';})

  const [poliList, setPoliList] = useState([]);
  const [selectedPoli, setSelectedPoli] = useState('');
  const [dokterList, setDokterList] = useState([]);
  const [selectedDokter, setSelectedDokter] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const poliDropdown = document.getElementById('poliDropdown');

    fetch('http://xhaeffer.me:11121/jadwal/api/getPoli')
      .then(response => response.json())
      .then(data => {
        setPoliList(data);
        data.forEach(poli => {
          const option = document.createElement('option');
          option.value = poli;
          option.textContent = poli;
          poliDropdown.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching poli:', error));
  }, []);

  const handlePoliChange = (event) => {
    const selectedPoli = event.target.value;
    setSelectedPoli(selectedPoli);

    const dokterDropdown = document.getElementById('dokterDropdown');
    dokterDropdown.innerHTML = '<option value="" selected disabled>Pilih Dokter</option>';

    fetch(`http://xhaeffer.me:11121/jadwal/api/byPoli/${selectedPoli}`)
      .then(response => response.json())
      .then(data => {
        setDokterList(data[0].JadwalDokter);
        
        const uniqueDokters = new Set(data[0].JadwalDokter.map(jadwal => jadwal.nama_dokter));

        uniqueDokters.forEach(dokter => {
          const option = document.createElement('option');
          option.value = dokter;
          option.textContent = dokter;
          dokterDropdown.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching dokter:', error));
  };

  const handleDokterChange = (event) => {
    const selectedDokter = event.target.value;
    setSelectedDokter(selectedDokter);
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  const submitReservasi = () => {
    const formData = {
        NoRS: parseInt(document.getElementsByName("NoRS")[0].value),
        NIK: parseInt(document.getElementsByName("NIK")[0].value),
        Nama: document.getElementsByName("Nama")[0].value,
        TglLahir: document.getElementsByName("TglLahir")[0].value,
        JenisKelamin: document.getElementsByName("JenisKelamin")[0].value,
        Poli: document.getElementsByName("Poli")[0].value,
        Dokter: document.getElementsByName("Dokter")[0].value,
        TglKunjungan: document.getElementsByName("TglKunjungan")[0].value,
        Pembayaran: document.getElementsByName("Pembayaran")[0].value,
        NoTelp: document.getElementsByName("NoTelp")[0].value,
        Email: document.getElementsByName("Email")[0].value,
    };

    fetch('http://xhaeffer.me:11121/reservasi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      alert("Reservasi Berhasil!");
    })
    .catch(error => {
      console.error('Error submitting reservation:', error);
    });
  };

  return (
    <div>
      <ReservationForm 
        poliList={poliList}
        selectedPoli={selectedPoli}
        dokterList={dokterList}
        selectedDokter={selectedDokter}
        selectedDate={selectedDate}
        handlePoliChange={handlePoliChange}
        handleDokterChange={handleDokterChange}
        handleDateChange={handleDateChange}
        submitReservasi={submitReservasi}
      />
    </div>
  );
};

export default Reservasi;
