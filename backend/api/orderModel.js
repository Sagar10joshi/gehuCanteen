import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerEmail: {
        type: String,
        required: true,
        lowercase: true,
        unique:false
    },
    cart: [{
        id: Number,
        name: String,
        quantity: Number,
      }],
    paymentMethod: {
        type: String,
        required: true
    },
    totalPrice: Number,
    taxes: Number,
    totalAmount: Number,

}, { timestamps: true })

export const Order = mongoose.model("Order",orderSchema)







