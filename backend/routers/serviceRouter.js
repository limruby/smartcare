import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Service from '../models/serviceModel.js';
import { isAuth, isAdmin, isSellerOrAdmin } from '../utils.js';

const serviceRouter = express.Router();

serviceRouter.get('/', expressAsyncHandler(async(req, res)=>{
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const nameFilter = name ? { name:{ $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const services = await Service.find({...sellerFilter, ...nameFilter, ...categoryFilter}).populate(
      'seller',
      'seller.name',
    );  
    res.send(services);
})
);

serviceRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Service.find().distinct('category');
    res.send(categories);
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
    const service = await Service.findById(req.params.id).populate(
      'seller',
      'seller.name seller.rating seller.numReviews'
    );
    if(service){
        res.send(service);
    }else{
        res.send(404).send({message: 'Service Not Found' });
    }
}))

serviceRouter.post('/', isAuth, isAdmin, isSellerOrAdmin, expressAsyncHandler(async(req, res) =>{
    const service = new Service({
        name:'sample name' + Date.now(),
        seller: req.user._id,
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

serviceRouter.put(
    '/:id',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
      const serviceId = req.params.id;
      const service = await Service.findById(serviceId);
      if (service) {
        service.name = req.body.name;
        service.price = req.body.price;
        service.image = req.body.image;
        service.category = req.body.category;
        service.schedule = req.body.schedule;
        service.location = req.body.location;
        service.description = req.body.description;
        const updatedService = await service.save();
        res.send({ message: 'Service Updated', service: updatedService });
        console.log(service.image)
      } else {
        res.status(404).send({ message: 'Service Not Found' });
      }
    })
  );

  serviceRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const service = await Service.findById(req.params.id);
      if (service) {
        const deleteService = await service.remove();
        res.send({ message: 'Service Deleted', service: deleteService });
      } else {
        res.status(404).send({ message: 'Service Not Found' });
      }
    })
  );

export default serviceRouter;