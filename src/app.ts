

import express ,{Application, Request,Response} from 'express'
const app =express()

const PORT= process.env.PORT || 5000
import dotenv from 'dotenv'
import connectDB from './Services/db'
import router from './Routes/MagicTransport' 
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1/magic-app',router)
const Start =async()=>{
    try {
         
      if(process.env.MONGO_URI)  
    await connectDB(process.env.MONGO_URI)

    app.listen(PORT,()=>{
      
        console.log(`Server is  listening on port ${PORT}`);
        
    })
        
    } catch (error) {
        console.log(error);
        
    }    
}
Start()