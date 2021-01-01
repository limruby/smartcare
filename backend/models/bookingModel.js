import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    bookingItems: [{
        name: {type: String, required: true},
        // if not array then set type: string
        scheduleSlot: {type: String, required: true},
        // scheduleSlot: {type: String, required:true}, 
        image: {type: String, required: true},
        price: {type: Number, required: true},
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },
    },
],
    customerAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        stateMsia: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    // Service has done
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
},
{
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;