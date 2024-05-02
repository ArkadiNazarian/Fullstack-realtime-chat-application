import mongoose from "mongoose"

export const connectMongoDB = async () => {
    if (mongoose.connections[0].readyState === 1) {
        return
    }
    try {
        await mongoose.connect('mongodb://localhost:27017/chat')
        console.log("connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
}