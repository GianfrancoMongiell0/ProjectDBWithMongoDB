import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://gianfrancomongiello:1234567890@projectbdweb.ozs64.mongodb.net/?retryWrites=true&w=majority&appName=ProjectBDWeb');
        console.log('DB connected')
    } catch (error) {
        console.log(error);
    }
}