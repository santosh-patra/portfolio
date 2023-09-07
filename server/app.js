import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import portfolioRoutes from '../routes/route.js';
const app = express();

dotenv.config()
app.use(express.json());
app.use(cors());
app.use('/v1/auth',portfolioRoutes)


app.get('/test',(req,res)=>{
    console.log("API tested successfully");
    res.send("API tested successfully")
})


export default app;