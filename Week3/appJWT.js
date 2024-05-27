const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const app = express()
const jwtpass = "123456"

const uri = "mongodb+srv://admin:lQgo5Lzyfr5k9QeU@cluster0.fuim8yn.mongodb.net/User?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });
app.use(express.json())


const User = mongoose.model("Users",{name: String , email : String , password : String})

app.post("/signup",async function(req,res){
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name

    const existingUser = await User.findOne({email:username})

    if(existingUser){
        res.status(403).send("User already exists")
    }
    const user = new User({
        name: name,
        email : username,
        password: password

    })
    user.save()
    res.json({
        msg: "User created succesfully"
    })
})

  function userNameExists(username,password){
    let bool = false;
    for(let i=0;i<ALL_USERS.length;i++){
          if(ALL_USERS[i].username == username && ALL_USERS[i].password ==password){
            bool = true;

          }    
        }

    return bool;
  }

  app.post("/signin",(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    if(!userNameExists(username,password)){
        res.status(403).json({
            msg:"User does not exist "
        })

    }else{
        var token = jwt.sign({ username: username }, jwtpass);
        res.json({
            token
        })
    }

  })

  app.get("/user",(req,res)=>{
    const token = req.headers.authorization;
    try{
        const decodee = jwt.verify(token,jwtpass)
        const username = decodee.username

        res.json({
            users: ALL_USERS.filter((value)=>{
                if(value.username == username){
                    return false;
                }else{
                    return true;
                }
            })
        })

    }catch(err){

    }
  })















app.listen(3000)