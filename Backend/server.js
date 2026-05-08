import  express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productsRoutes.js'
import cartRoutes from './routes/cart.js'
import addressRoutes from './routes/address.js'
import orderRoutes from './routes/order.js'
import userRoutes from './routes/userRoutes.js'


dotenv.config();

const app = express();
const PORT=5001;

app.use(cors());
app.use(express.json())
app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/address',addressRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/user',userRoutes)


app.get("/",(req,res)=>{
    res.send("api is running......")
})

connectDB()

app.listen(PORT,()=>{
   console.log(`server is running on http://localhost:${PORT}`) 
})