import mongoose ,{model} from "mongoose";
const MagicItemSchema= new mongoose.Schema({
    Name :{
        type :String,
        required :true
    },
    Weight :{
        type :Number,
        required :true
    },
   
})
export default mongoose.model('MagicItem',MagicItemSchema)