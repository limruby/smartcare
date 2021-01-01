import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js';
import { isAuth } from '../utils.js';

const bookingRouter = express.Router();

bookingRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const booking = new Booking({
        orderItems: req.body.orderItems,
        customerAddress: req.body.shippingAddress,
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

export default bookingRouter;