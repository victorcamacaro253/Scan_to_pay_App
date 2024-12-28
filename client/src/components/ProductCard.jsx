import React,{useState} from 'react';

const ProductCard = ({ product, addToCart,removeFromCart   }) => {
  const [quantity, setQuantity] = useState(1); // Valor inicial de la cantidad

  const handleAddToCart = () => {
    // Llama a addToCart con el producto y la cantidad seleccionada
    addToCart({ ...product, quantity });
  };

  const handleRemoveFromCart = () => {
    // Llama a removeFromCart con el producto
    removeFromCart(product.id); // Se asume que el producto tiene un `id`
  };


  const updateQuantity= (change)=>{
 setQuantity(prevQuantity => Math.max(1,prevQuantity + change))
  }

  return (
    <div className="card" >
      <img
        src={`/img/${product.imagen}`} 
        className="card-img-top img-fluid"
        alt={product.name}
        style={{ maxHeight: '250px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="card-text">
          <strong>Precio:</strong> {product.amount / 100} $
        </p>

        <div className="form-group">
          <label htmlFor="quantity">Cantidad:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={()=> updateQuantity(-1)} disabled={quantity<= 1}>-</button>
          <span style={{ margin: '0 10px' }}>{quantity}</span>
          <button className="btn btn-secondary" onClick={()=> updateQuantity(+1)}>+</button>
        </div>

        </div>

       <div  style={{ marginTop: '10px' }}>
        <button className="btn btn-primary" onClick={handleAddToCart} style={{ marginLeft: '10px' }}
>
          Agregar al Carrito
        </button>
        <button
            className="btn btn-danger"
            onClick={() => removeFromCart(product.product_id) }
  
            style={{ marginLeft: '10px' }}
          >
            Quitar del Carrito
          </button>
          </div>
      </div>
    </div>
  );
};

export default ProductCard;
