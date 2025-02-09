import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (v) => {
                return /^\S+@\S+\.\S+$/.test(v); // Basic email regex
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
    },
    role: {
        type: String,
        enum: ['user', 'owner'], 
        required: true,
        default: 'user', // Default is user role, owner can be assigned manually
    },
}, { timestamps: true })

export const User = mongoose.model("User",userSchema)
