import express,{json} from 'express';
import paymentRoutes from './routes/paymentRoutes.js';
import cors from 'cors'
import helmet from 'helmet';
import productRoutes from  './routes/productsRoutes.js';
import path from 'path';


const app = express();

app.use(helmet())

app.use(cors())
app.use(json());


const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../client/dist')));

//Usa las rutas de productos
app.use('/products',productRoutes)

//Usa las rutas de pagos
app.use(paymentRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
  

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
  
/*
app.get('/',(req,res)=>{
    res.json({ message : 'hola mundo' })
})
*/






// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});