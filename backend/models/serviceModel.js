import mongoose from 'mongoose';
const serviceSchema = new mongoose.Schema(

{
    name:{type: String, required: true, unique: true},
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    image:{type: String, required: true},
    category:{type: String, required: true},
    description:{type: String, required: true},
    price:{type: Number, required: true},
    schedule:{type: Array, "default":[], required: true},
    rating:{type: Number, required: true},
    numReviews:{type: Number, required: true},
    location:{type: String, required: true},
    
},
{
    timestamps: true
}
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;