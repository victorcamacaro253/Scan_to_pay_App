import React,{useState,useEffect,useMemo} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CartModal from './CartModal'
import ProductCard from './components/ProductCard';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Asegúrate de importar desde el paquete correcto


const  PaymentForm= ()=>{
/*const [items] = useState([
        { product_id: 1, name: 'Telefono', description: 'Descripción A', amount: 5230, quantity: 1 ,image:'../src/img/iphone.jpg'},
        { product_id: 2, name: 'Producto B', description: 'Descripción B', amount: 3000, quantity: 2, image:'../src/img/dell-laptop.jpg' },

    ])
*/
    const [items,setItems] = useState([])
    const [cart, setCart] = useState(() => {
      // Recuperar los productos del localStorage al iniciar
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Estado para el modal del carrito


    const fetchProducts= async ()=>{
      try{
    
        const response = await fetch('/products')
        console.log(response)
        if(!response.ok) throw new Error (`HTPP Error ${response.status}`)
        const data = await response.json();
        setItems(data);
       // console.log(data)

  
      }catch(error){
        console.error(error);
        console.log(error)
  
  
      }
     }

     useEffect(() => {

  fetchProducts();

      try {
        const storedCart = localStorage.getItem('cart');
        console.log(storedCart)
        if (storedCart) {
          console.log('Intentando setear carrito:', storedCart);
          const parsedCart = JSON.parse(storedCart); // Convertir el string a objeto

          if (Array.isArray(parsedCart)) {
              setCart(parsedCart);
          } else {
              console.error('El carrito no es un arreglo válido.');
          }
        }
      } catch (error) {
        console.error('Error al recuperar el carrito:', error);
      }
    }, []);
    
 

   useEffect(()=>{
  

       localStorage.setItem('cart', JSON.stringify(cart));
       

        console.log('Carrito actualizado:', cart);
 
   },[cart])


  const addToCart = (product) => {

    setCart((prevCart) => {
        const existingProduct = prevCart.find(item => item.product_id === product.product_id);

        if (existingProduct) {
            // Si el producto ya existe, actualizar la cantidad
            return prevCart.map(item => 
                item.product_id === product.product_id 
                ? { ...item,
                   quantity: item.quantity + product.quantity,
                   amount: (item.amount / item.quantity) * (item.quantity + product.quantity)
                } // Crear un nuevo objeto
                : item
            );
            
        } else {
            // Si no existe, agregar el nuevo producto
            return [...prevCart, { ...product, amount: (product.amount * product.quantity) }];
        }
        
    });


};

const removeFromCart = (productId) => {
  setCart((prevCart) => {
      const product = prevCart.find(item => item.product_id === productId);

      if (product && product.quantity > 1) {
          // Si la cantidad es mayor que 1, reducir la cantidad en 1
          return prevCart.map(item =>
              item.product_id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
          );
      } else {
          // Si la cantidad es 1, eliminar el producto del carrito
          return prevCart.filter(item => item.product_id !== productId);
      }
  });
};

const clearCart  = () => {
  setCart([]);
  localStorage.removeItem('cart'); // Limpiar el localStorage

  }


 /* const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.amount * item.quantity), 0) / 100; // Dividir por 100 para obtener el valor en USD
};*/

// 4. Usar useMemo para evitar cálculos innecesarios
const total = useMemo(() => {
  return cart.reduce((total, item) => total + item.amount * item.quantity, 0) / 100;
}, [cart]);

const handleOpenCartModal = () => {
  setIsCartModalOpen(true);  
};

const handleCloseCartModal = () => {
  setIsCartModalOpen(false);
};



   return (
   
    <div>
        <div className="container">
      <h1 className="my-4">Nuestros Productos</h1>


    
        {/* Ícono del carrito */}
        <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000,cursor:'pointer' }}>
          <FontAwesomeIcon icon={faShoppingCart} size="2x" onClick={handleOpenCartModal} />
          {cart.length > 0 && (
            <span style={{ position: 'absolute', top: 0, right: 0, background: 'blue', color: 'white', borderRadius: '50%', padding: '5px 10px' }}>
              {cart.length}
            </span>
          )}
        </div>



      <div className="row">
        {items.map((item) => (
          <div className="col-md-4 mb-4 d-flex" key={item.product_id}>
            <ProductCard product={item} addToCart={addToCart} removeFromCart={removeFromCart} />
          </div>
        ))}
      </div>
      </div>



   
           {/* Modal del carrito */}
           <CartModal
        isOpen={isCartModalOpen}
        onClose={handleCloseCartModal}
        cart={cart}
        calculateTotal={total}
        removeFromCart={removeFromCart} 
        clearCart={clearCart}
      />

    


    </div>

   )

}

export default PaymentForm;