import { useState } from 'react';

const UpdateReservasi = () => {
  const [updatePopupData, setUpdatePopupData] = useState(null);
  
    const openUpdatePopup = async (idReservasi) => {
      try {
        // const response = await fetch(`http://xhaeffer.me:11121/api/reservasi/byID/${idReservasi}`, { credentials: 'include' });
        const response = await fetch(`http://localhost:8080/api/reservasi/byID/${idReservasi}`, { credentials: 'include' });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUpdatePopupData(data[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  const submitUpdate = async (updatedData, userData, fetchReservasiData, closePopup, recaptchaScore) => {
    try {
      updatedData.no_asuransi = parseInt(updatedData.no_asuransi, 10);
      updatedData.recaptchaResponse = recaptchaScore;

      // const response = await fetch(`http://xhaeffer.me:11121/api/reservasi/byID/${updatePopupData.id_reservasi}`, {
      const response = await fetch(`http://localhost:8080/api/reservasi/byID/${updatePopupData.id_reservasi}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Data:', errorData);
        throw new Error(errorData.error);
      }

      const data = await response.json();
      closePopup('closePopup');
      fetchReservasiData(userData.user.no_rs);
      alert(data.message);

    } catch (error) {
      console.error('Error updating data:', error.message);
      alert(error.message);
    }
  };

  const closePopup = (popupId) => {
    if (popupId === 'closePopup') {
      setUpdatePopupData(null);
    }
  };

  const deleteReservasi = async (reservasiId, fetchReservasiData, userData, recaptchaScore) => {
    const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus data?');
  
    if (!isConfirmed) {
      return;
    }
  
    try {
      // const response = await fetch(`http://xhaeffer.me:11121/api/reservasi/byID/${reservasiId}`, {      
      const response = await fetch(`http://localhost:8080/api/reservasi/byID/${reservasiId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ recaptchaResponse: recaptchaScore }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Data:', errorData);
        throw new Error(errorData.error);
      }
  
      const data = await response.json();
      if (!data.error) {
        fetchReservasiData(userData.user.no_rs);
        alert(data.message);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  };

const UpdatePopup = ({ data, onUpdate, onClose }) => {
  const [updatedData, setUpdatedData] = useState({
    tgl_kunjungan: data.tgl_kunjungan,
    email: data.email,
    no_telp: data.no_telp,
    pembayaran: data.pembayaran,
    no_asuransi: data.no_asuransi,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePembayaranChange = (event) => {
    const value = event.target.value;
    setUpdatedData((prevData) => ({
      ...prevData,
      pembayaran: value,
      no_asuransi: value !== 'Pribadi' ? prevData.no_asuransi || '' : '',
    }));
  };

  return (
    <div>
      <div id="updatePopup" className="popup-cekreservasi" style={{ display: 'flex' }}>
        <div className="popup-content-cekreservasi">
          <h2>Update Reservasi</h2>
          <form id="updateForm">
            <table>
              <tbody>
                <tr>
                  <td>ID Reservasi:</td>
                  <td><span id="popupIdReservasi">{data.id_reservasi}</span></td>
                </tr>
                <tr>
                  <td>No RS:</td>
                  <td><span id="popupNoRS">{data.no_rs}</span></td>
                </tr>
                <tr>
                  <td>Poli:</td>
                  <td><span id="popupNIK">{data.poli}</span></td>
                </tr>
                <tr>
                  <td>Dokter:</td>
                  <td><span id="popupDokter">{data.dokter}</span></td>
                </tr>
                <tr>
                  <td>Tanggal Kunjungan:</td>
                  <td><input type="date" id="popupTglKunjungan" name="tgl_kunjungan" value={updatedData.tgl_kunjungan} onChange={handleInputChange} required/></td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td><input type="email" id="popupEmail" name="email" value={updatedData.email} onChange={handleInputChange} required/></td>
                </tr>
                <tr>
                  <td>No Telepon:</td>
                  <td><input type="text" id="popupNoTelp" name="no_telp" value={updatedData.no_telp} onChange={handleInputChange} required/></td>
                </tr>
                <tr>
                  <td>Pembayaran:</td>
                  <td>
                    <select id="popupPembayaran" name="pembayaran" value={updatedData.pembayaran} onChange={handlePembayaranChange} required>
                      <option value="Pribadi">Pribadi</option>
                      <option value="Perusahaan">Perusahaan</option>
                      <option value="Asuransi">Asuransi</option>
                      <option value="BPJS">BPJS</option>
                    </select>
                  </td>
                </tr>
                {updatedData.pembayaran !== 'Pribadi' && (
                  <tr>
                    <td>No Asuransi:</td>
                    <td><input type="number" onInput={(e) => e.preventDefault()} maxLength="16" id="popupNoAsuransi" name="no_asuransi" value={updatedData.no_asuransi || ''} onChange={handleInputChange} required/></td>
                  </tr>
                )}
              </tbody>
            </table>
            <p></p>
            <button className="hijau" onClick={() => onUpdate(updatedData)}>Update</button>
            <button className="" onClick={() => onClose('closePopup')}>Batal</button>
          </form>
        </div>
      </div>
    </div>
  );
};

  return { openUpdatePopup, submitUpdate, closePopup, deleteReservasi, UpdatePopup, updatePopupData, setUpdatePopupData, };
};

export default UpdateReservasi;
