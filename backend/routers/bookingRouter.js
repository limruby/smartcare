import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js';
import { isAuth } from '../utils.js';

const bookingRouter = express.Router();

bookingRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.bookingItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const booking = new Booking({
        bookingItems: req.body.bookingItems,
        customerAddress: req.body.customerAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdBooking = await booking.save();
      res
        .status(201)
        .send({ message: 'New Booking Created', booking: createdBooking });
    }
  })
);

bookingRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      res.send(booking);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);


export default bookingRouter;