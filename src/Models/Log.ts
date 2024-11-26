import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    MagicMover :{
        type : mongoose.Schema.ObjectId,
        ref:'MagicMover'
    },
    State:{
        type: String,
        required:true,
        enum:{
            values: ['resting','loading','on-mission'],
        },

    }
},{timestamps:true})
export default mongoose.model('Log',LogSchema)