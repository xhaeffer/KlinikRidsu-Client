import React from 'react';

const PaymentInfoCard = () => {
  return (
    <div className="body-reservasi" id="paymentInfoCard">
      <h2>Informasi Pembayaran</h2>
      <div className="form-group">
        <label>Pembayaran</label>
        <select name="Pembayaran">
          <option value="Pribadi">Pribadi</option>
          <option value="Perusahaan">Perusahaan</option>
          <option value="Asuransi">Asuransi</option>
          <option value="BPJS">BPJS</option>
        </select>
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

export default PaymentInfoCard;
