import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PersonalInfoCard from './PersonalInfoCard';
import AppointmentInfoCard from './AppointmentInfoCard';
import PaymentInfoCard from './PaymentInfoCard';
import IdentitasDokter from './IdentitasDokter';


const ReservationForm = ({
    poliList,
    selectedPoli,
    dokterList,
    selectedDokter,
    selectedDate,
    handlePoliChange,
    handleDokterChange,
    handleDateChange,
    submitReservasi,
  }) => {
    return (
      <>
        <Header />
        <div className="isi">
          <h1>Reservasi</h1>
        </div>
        <form action="/reservasi" method="POST">
          <PersonalInfoCard />
          <AppointmentInfoCard
            poliList={poliList}
            dokterList={dokterList}
            selectedPoli={selectedPoli}
            selectedDokter={selectedDokter}
            selectedDate={selectedDate}
          />
          <PaymentInfoCard />
          <IdentitasDokter />
          <button type="submit" className="tbl-hijau" name="daftar" onClick={submitReservasi}>
            RESERVASI
          </button>
        </form>
        <Footer />
      </>
    );
  };
  
  export default ReservationForm;
