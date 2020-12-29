import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(

{
    name:{type: String, required: true, unique: true},
    image:{type: String, required: true},
    category:{type: String, required: true},
    description:{type: String, required: true},
    price:{type: String, required: true},
    schedule:{type: String, required: true},
    rating:{type: String, required: true},
    numReviews:{type: String, required: true},
    location:{type: String, required: true},
    
},
{
    timestamps: true
}
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;