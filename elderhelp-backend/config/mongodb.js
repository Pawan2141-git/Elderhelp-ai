import mongoose from "mongoose";

const  connectDB = async function (){
        mongoose.connection.on('connected',()=>{
            console.log('DB Connected');
            
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/elderhelp`)
}

export  {connectDB};