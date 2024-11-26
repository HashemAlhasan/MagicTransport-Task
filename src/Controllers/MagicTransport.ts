

import { Response,Request } from "express";
import MagicMover from '../Models/MagicMover'
import MagicItem from "../Models/MagicItem";
import Log from "../Models/Log";
export const addMagicMover =async(req:Request,res:Response):Promise<Response> =>{
    try {
        const WeightLimit : number | undefined = req.body.WeightLimit
        if(!WeightLimit){
            return res.status(400).json({msg : 'Pleas Provide The Wieght Limit'})
        }
        const result  = await MagicMover.create({WeightLimit:WeightLimit})
        return res.status(200).json({msg :'Done Sucessfuly',magicmover:result})
    } catch (error) {
        return res.status(500).json({msg : 'Internal Server Error'})
        
    }
}
export const addMagicItem =async(req:Request,res:Response):Promise<Response> =>{
    try {
        const Weight : number | undefined = req.body.Weight
        const Name : string | undefined=req.body.Name
        if(!Weight || !Name){
            return res.status(400).json({msg : 'Pleas Provide The Wieght And Name'})
        }
        const result  = await MagicItem.create({Weight:Weight ,Name:Name})
        return res.status(200).json({msg :'Done Sucessfuly',magicItem:result})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({msg : 'Internal Server Error'})
        
    }
}
export const LoadMagicMover =async(req:Request,res:Response):Promise<Response> =>{
    try {
        const MagicMoverId =req.body.MagicMoverId
        const Items : string[] = req.body.Items
        if(!MagicMoverId) {
            return res.status(400).json({msg:'Please Provide Full Information'})
        }
        const WeightLimit = await MagicMover.findOne({_id:MagicMoverId})
        if(!WeightLimit){
            return res.status(400).json({msg:'Could not find Magic Mover'})
        }
        if(WeightLimit.QuestState==='on-mission'){
            return res.status(400).json({msg:"You can't Load More Items"})
        }
        

        
            const ItemsWieght = await MagicItem.find({Name:{$in:Items}}).select('Weight -_id')
           const SumOfWieghts :number = ItemsWieght.reduce((accumulator, currentValue)=>{
            return accumulator+currentValue.Weight 
           },0)
           console.log(SumOfWieghts);
           if(SumOfWieghts>WeightLimit.WeightLimit){
            return res.status(400).json({msg:"You Have Passed The Wieght Limit"})

           }
          
            WeightLimit.QuestState='loading'
            WeightLimit.save()
            const log = await Log.create({
                MagicMover:WeightLimit._id,
                State:'loading'
            })
            

        


        return res.status(200).json({msg:'Done Sucessfuly'})
    } catch (error) {
        return res.status(500).json({msg : 'Internal Server Error'})
    }




}
export const StartMission =async(req:Request,res:Response):Promise<Response> =>{
    try {
        const MagicMoverId : string | null= req.body.MagicMoverId
        if(!MagicMoverId){
            return res.status(400).json({msg:'Please Provide Full Information'})
        }
        const Magicmover =await MagicMover.findOne({_id:MagicMoverId})
        if(!Magicmover){
            return res.status(400).json({msg:'Could not find Magic Mover'})
        }
        Magicmover.QuestState='on-mission'
        Magicmover.save()
        const log = await Log.create({
            MagicMover:Magicmover._id,
            State:"on-mission"
        })

        return res.status(200).json({msg:"Done Sucessfuly"})
    } catch (error) {
        return res.status(500).json({msg : 'Internal Server Error'})
    }




}
export const EndMission =async(req:Request,res:Response):Promise<Response> =>{
    try {const MagicMoverId : string | null= req.body.MagicMoverId
        if(!MagicMoverId){
            return res.status(400).json({msg:'Please Provide Full Information'})
        }
        const Magicmover =await MagicMover.findOne({_id:MagicMoverId})
        if(!Magicmover){
            return res.status(400).json({msg:'Could not find Magic Mover'})
        }
        Magicmover.QuestState='resting'
        Magicmover.save()
        const log = await Log.create({
            MagicMover:Magicmover._id,
            State: 'resting'
        })

        return res.status(200).json({msg:"Done Sucessfuly"})
    } catch (error) {
        return res.status(500).json({msg : 'Internal Server Error'})
    }




}
export const GetCompleted =async(req:Request,res:Response):Promise<Response> =>{
    try {
        const result = await Log.aggregate([{
            $group:{
                _id:'$MagicMover',
                
                total :{
                    $sum:{
                                $cond:[{$eq:['$State','resting']},1,0]
                    }
                },
                d :{$push :'$$ROOT'}
            }
           
            
            
           
        } ,{
            $project:{
                _id:1,
                total:1
            }
        },{
            $sort:{
                total:-1
            }
        }])
        return res.status(200).json({msg:result})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({msg : 'Internal Server Error'})
    }




}

