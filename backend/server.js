import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/services/:id', (req, res) => {
    const service = data.services.find( x => x._id === req.params.id);
    if(service){
        res.send(service);
    }else{
        res.status(404).send({message: 'Service not Found'});
    }
})

app.get('/api/services', (req, res) => {
    res.send(data.services);
})

app.get('/', (req, res) => {
    res.send('Server is ready');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});