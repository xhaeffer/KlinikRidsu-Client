import React, { useState } from 'react';

const PaymentInfo = () => {
  const [selectedPayment, setSelectedPayment] = useState('Pribadi');

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  return (
    <div className="card-reservasi" id="paymentInfoCard">
      <h2>Informasi Pembayaran</h2>
      <div className="form-group">
        <label>Pembayaran</label>
        <select name="Pembayaran" value={selectedPayment} onChange={handlePaymentChange}>
          <option value="Pribadi">Pribadi</option>
          <option value="Perusahaan">Perusahaan</option>
          <option value="Asuransi">Asuransi</option>
          <option value="BPJS">BPJS</option>
        </select>
      </div>

      <div className="form-group">
        {selectedPayment !== 'Pribadi' && (
          <div className="form-group">
            <label>No Asuransi</label>
            <input type="text" name="NoAsuransi" placeholder="No Asuransi" required />
          </div>
        )}
      </div>

      <div className="form-group">
        <label>No Telepon</label>
        <input
          type="text"
          name="NoTelp"
          placeholder="No Telepon"
          maxLength="16"
          pattern="\+?\d{10,16}"
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="Email" placeholder="Email" title="Email tidak valid!" required />
      </div>



      <p></p>
    </div>
  );
};

export default PaymentInfo;
