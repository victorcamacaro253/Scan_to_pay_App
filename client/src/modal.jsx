import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modal = ({ isOpen, onClose, qrCode, paymentUrl, paymentMethod, handlePayment }) => {
  
  if (!isOpen) return null;


  const handlePayClick = () => {
    window.location.href = paymentUrl;
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Pagar con {paymentMethod}</h2>
        
        <div className="qr-code-container">
          <img src={qrCode} alt="QR Code" />
          <p>Escanea el QR code para pagar</p>
        </div>
        <div className="link-container">
        </div>
        <button onClick={handlePayClick}>Ir a Pagar</button>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;