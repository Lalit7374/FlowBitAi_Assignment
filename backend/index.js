const express = require("express")

const PORT = 8080;
const cors=require("cors")
const bcrypt=require("bcrypt")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// connect to database
const mongoose = require("mongoose")

const MONGO_URL = "mongodb://127.0.0.1:27017/login"

mongoose.connect(MONGO_URL).then(() => {
    console.log("MongoDb connection Est.");

}).catch(() => {
    console.log("Failed to Connect");

})
const connection = mongoose.connection;


// schema
const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    userName:String,
    password:String

})


const userModel = mongoose.model("user",userSchema)



app.get("/", async (req, res) => {
   
    const user=await userModel.find()
    res.json(user)
    
})


app.post("/user/register",async(req,res)=>{
    try{
    const {firstName,lastName,email,password,userName}=req.body;
    const saltRounts=10;
    const hashpassword= await bcrypt.hash(password,saltRounts)
     console.log(hashpassword)
    const newUser=new userModel({
        firstName,lastName,email,userName,password:hashpassword
    })
    console.log(newUser)
     await newUser.save()
   res.status(201).json({message:"Successfully Reg"})
}catch{
    res.status(500).json({message:"Error"})


}

   

})
app.post("/user/login",async(req,res)=>{
  const {userNameorEmail,password}=req.body
    const user=await userModel.findOne({
        $or:[{userName:userNameorEmail},{email:userNameorEmail}]
    })
if(user){
    const isMatch=await bcrypt.compareSync(password,user.password)
    if(isMatch){
        res.status(200).json({message:"Success log in "})
    }else{
        res.status(500).json({message:"Wrong password "})

    }
}
else{
    console.log("fxxs")

}


    //console.log(req.body)
    
})
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);

})