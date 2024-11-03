import mongoose, { Schema } from "mongoose";

const TransactionSchema= new mongoose.Schema({
   razorpay_payment_id:{
      type:String,
      required:[true,'razorpay_payment_id is required'],

  },
  razorpay_subscription_id:{
   type:String,
   required:[true,'razorpay_subscription_id is required']
   
  },
  razorpay_signature:{
      type:String,

  },
 ProjectId:{
    type:Schema.Types.ObjectId,
    ref:"Project",
 
 },
 backerId:{
    type:Schema.Types.ObjectId,
    ref:"User",
   
 },
 amount:{
    type:Number,
    required:true,
 },

 paymentStatus:{
    type:String,
    enum:["pending","completed","failed"]
 },
 paymentMethod:{
    type:String,
    enum:["credit_card","paypal","razorpay"]
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