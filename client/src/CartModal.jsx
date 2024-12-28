import React from "react";
import PropTypes from "prop-types";

const CartModal = ({ isOpen, onClose, cart, calculateTotal, removeFromCart, clearCart }) => {
  // console.log('CartModal props:', { isOpen, cart, calculateTotal });

  if (!isOpen) return null;

  return (
    <div className="modal modal-overlay">
      <div className="modal-content">
        <h2>Carrito de Compras</h2>

        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) :         (
          <div>
            <ul className="list-group">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex align-items-center">
                  {/* Product Image */}
                  <img
                    src={`/img/${item.imagen}`}
                    alt={item.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                  />
                  {/* Product Details */}
                  <div className="flex-grow-1">
                    <p><strong>{item.name}</strong></p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio por unidad: ${(item.amount / 100).toFixed(2)}</p>
                    <p>Total: ${(item.amount * item.quantity / 100).toFixed(2)}</p>
                  </div>
                  {/* Remove Product Button */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.product_id)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            {/* Total and Action Buttons */}
            <h3 className="mt-3">Total: ${calculateTotal.toFixed(2)}</h3>
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-warning"
                onClick={clearCart}
              >
                Vaciar Carrito
                
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onClose();
               //   localStorage.setItem('cart', JSON.stringify(cart));
                  window.location.href = '/payment-interface';
                }}
              >
                Continuar con el pago
              </button>
            </div>
          </div>
        )}

        {/* Close Button */}
        <button className="btn btn-secondary mt-3" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
  calculateTotal: PropTypes.number.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default CartModal;
