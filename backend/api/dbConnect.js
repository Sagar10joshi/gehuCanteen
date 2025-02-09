import mongoose from "mongoose"
import express from "express"
import dotenv from "dotenv"
dotenv.config({
    path : "./.env"
})

const app = express();

const dbConnect = async()=>{
    try {
        const connectionId = await mongoose.connect(`${process.env.MONGODB_URI}/gehu_Canteen`)
        console.log(`Database Connected Successfully :${connectionId.connection.host}`);

        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error;
        })

    } catch (error) {
        console.log(" DATABASE connection FAILED",error);
    }
}

export default dbConnect;