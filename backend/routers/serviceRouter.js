import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Service from '../models/serviceModel.js';
import { isAuth, isAdmin } from '../utils.js';

const serviceRouter = express.Router();

serviceRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const services = await Service.find({});
    res.send(services);
})
);

serviceRouter.get(
    '/seed', 
    expressAsyncHandler ( async (req, res) =>{
     //await Service.remove({});
    const createdServices = await Service.insertMany(data.services);
    res.send({ createdServices })

})
);

serviceRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const service = await Service.findById(req.params.id);
    if(service){
        res.send(service);
    }else{
        res.send(404).send({message: 'Service Not Found' });
    }
}))

serviceRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) =>{
    const service = new Service({
        name:'sample name' + Date.now(),
        image:'/images/nurse1.png',
        price: 0,
        category:'sample category',
        location: 'sample location',
        schedule:[
            "Time: Day: Date:",
        ],
        rating: 0,
        numReviews: 0,
        description: 'Contact of PIC, name of PIC, pricing, location, staff, what service do we provide, visiting hour for family members'
    })
    const createdService = await service.save();
    res.send({message:'Service created', service: createdService})
}))

export default serviceRouter;