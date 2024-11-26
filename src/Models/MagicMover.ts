import mongoose ,{model} from "mongoose";
const MagicMoverSchema= new mongoose.Schema({
    WeightLimit :{
        type :Number,
        required :true
    },
    QuestState :{
        type: String,
        required:true,
        enum:{
            values: ['resting','loading','on-mission'],
        },
        default:'resting'
    }
})
export default mongoose.model('MagicMover',MagicMoverSchema)