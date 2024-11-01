import dotenv from "dotenv";
dotenv.config({
  path:'./.env'
})

import app from "./app.js"
import connecttoDB from "./config/connecttoDB.js";
import cloudinary from "cloudinary"


const PORT=process.env.PORT||3000;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
    
    });

app.listen(PORT,async ()=>{
    await connecttoDB();
    console.log(`your server is running on http://localhost:${PORT}`);
});