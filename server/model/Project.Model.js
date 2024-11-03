import mongoose, { Schema } from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,

    },
    description:{
        type:String,
    },
    category: { 
        type: String,
         enum: ["Technology", "Art", "Education", "Health",],
         default:"Technology"
         },

    creatorId:[{
        type:String
    }],
    fundingGoal:{
        type:Number,
        required:true
    },
    amountRaised:{
        type:Number,
        required:true
    },
    createdAt: {
        type:Date,
      },
      updatedAt: {
        type:Date,
      },
      deadline: {
        type:Date,
        required:true,
      },
      mediaurls:[{
        public_id:{
            type:String
          },
          //is url ke throuh avatar ko access kar ajaega yeh clodnary la url hai jahan image store hogi
          secure_url:{
            type:String
          },
      }],
      status: { type: String,
         enum: ["active", "funded", "expired"],
         default:"active" },
         
      rewards:[{
        type:Schema.Types.ObjectId,
        ref:'Reward'
      }],
      transactions:[{
        type:Schema.Types.ObjectId,
        ref:'Transaction'
      }], 
      backers:{
        type:Number,
      },
    posts:[{
      type:String
    }]
},{
    timestamps:true
})

const Project = mongoose.model("Project", ProjectSchema);
export default Project;


