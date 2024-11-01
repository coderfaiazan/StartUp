import mongoose, {Schema} from "mongoose";

const postschema = new mongoose.Schema({
   projectId:{
    type:String,
   
   },
   userId:{
    type:String,
    
   },
   content:{
    type:String,
    required:true,
   },
   createdAt:{
    type:Date
   },
   updatedAt:{
    type:Date
   },
   comments:[{
    type:String
   }]

},{
    timestamps:true
})

const post = mongoose.model("post", postschema);
export default post;