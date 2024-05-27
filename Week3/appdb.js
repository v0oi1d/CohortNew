const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const app = express()
const jwtpass = "123456"

app.use(express.json())

mongoose.connect("mongodb+srv://admin:lQgo5Lzyfr5k9QeU@cluster0.fuim8yn.mongodb.net/")

const User = mongoose.model("Users",
{name: String , email : String , password : String})

app.post("/signup",async function(req,res){
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name

    const existingUser = await User.findOne({email:username})

    if(existingUser){
        return res.status(403).send("User already exists")
    }else{
        const user = new User({
            name: name,
            email : username,
            password: password
    
        })
        await user.save()
       return  res.json({
            msg: "User created succesfully"
        })
    }
    
})

app.listen(3000)