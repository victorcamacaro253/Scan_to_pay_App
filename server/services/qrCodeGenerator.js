import qrcode from 'qrcode';

const generateQrCode = async (checkoutUrl) => {
  try {
    const qrCode = await qrcode.toDataURL(checkoutUrl, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      width: 200, // Establece el ancho del código QR
    });
    return qrCode;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default generateQrCode;
