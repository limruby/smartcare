import express from 'express';
import mongoose from 'mongoose';
import serviceRouter from './routers/serviceRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/smartcare', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, 
})

app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
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