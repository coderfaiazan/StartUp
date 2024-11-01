import mongoose, { Schema } from "mongoose";

const TransactionSchema= new mongoose.Schema({
 ProjectId:{
    type:Schema.Types.ObjectId,
    ref:"Project",
    required:true
 },
 backerId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
 },
 amount:{
    type:Number,
    required:true,
 },
 rewardId:{
    type:Schema.Types.ObjectId,
    ref:"Reward"
 },
 paymentStatus:{
    type:String,
    enum:["pending","completed","failed"]
 },
 paymentMethod:{
    type:String,
    enum:["credit_card","paypal","stripe"]
 },
 transactionDate:{
    type:Date,
 },
 createdAt:Date,
 updatedAt:Date,
},{
    timestamps:true,
})

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;