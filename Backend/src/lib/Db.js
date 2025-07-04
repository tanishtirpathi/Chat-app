import mongoose from "mongoose"

export const connectdb = async()=>{
    try {

       const conection=  await mongoose.connect(process.env.MONGO_URL)
       console.log(`database connected to the ${conection.connection.host}`)

    } 
    catch (error) { 

        console.log("error hai bhai dekh le yaha pe ",error )

    }
}