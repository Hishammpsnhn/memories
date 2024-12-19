import mongoose from "mongoose";


const connectDb =async ()=>{
    console.log(process.env.MONGO_URI)
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            UseUnifiedTopology: true
        })
        console.log(`mongodb connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDb