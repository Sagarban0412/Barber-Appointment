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
    },
    verifyOtpHash: {
        type: String,
        default: null,
        select: false,
    },
    verifyOtpExpires: {
        type: Date,
        default: null,
        select: false,
    },
})

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
