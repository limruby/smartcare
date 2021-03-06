import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import serviceRouter from './routers/serviceRouter.js';
import userRouter from './routers/userRouter.js';
import bookingRouter from './routers/bookingRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/smartcare', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
})

app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/bookings', bookingRouter);
app.get('/api/config/paypal' , (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})
app.get('/', (req, res) => {
    res.send('Server is ready');
});
// To capture error in mongoDB
app.use((err, req, res, next) =>{
    res.status(500).send({ message: err.message});
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});