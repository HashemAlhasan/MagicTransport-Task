import { connect } from "mongoose";


const connectDB = async(url:string):Promise<void>  =>  {
  try {
    await connect(url);
    console.log('Connected To DB Successfully');
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
