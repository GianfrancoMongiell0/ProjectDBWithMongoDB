import mongoose from "mongoose";



const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,

    }

}, {
    timestamps: true
});



export default mongoose.model('User', UserSchema);