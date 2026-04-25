import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    visited:{
        type: Number,
        default: 0
    }
})

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
