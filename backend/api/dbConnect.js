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

        // Drop the unique index after the connection is established
        Order.collection.dropIndex('customerEmail_1', (err, result) => {
            if (err) {
                console.log('Error dropping index:', err);
            } else {
                console.log('Index dropped successfully:', result);
            }
        });

        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error;
        })

    } catch (error) {
        console.log(" DATABASE connection FAILED",error);
    }
}

export default dbConnect;