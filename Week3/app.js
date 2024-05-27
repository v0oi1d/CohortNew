const express = require('express'); 
  
const app = express(); 
const PORT = 3000; 



function userMiddleWare(req,res,next){
    if(req.headers.username !="Anish" || req.headers.password !="pass"){
        res.status(403).json("User or password wrong");
    }else{
        next();
    }
}
function kidneyMiddleWare(req,res,next){
    const kidneyId = parseInt(req.query.kidneyId);
    if(kidneyId !==1 && kidneyId !==2){
        // res.json(kidneyId);
        res.status(403).send("There is something wrong with your kidney");
    }else{
        next();
    }
}


app.get("/health",userMiddleWare,kidneyMiddleWare,(req,res)=>{
    res.send("your health is alright")

});
app.get("/heart",userMiddleWare,(req,res)=>{
    res.send("your hearth is alright")

});






app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 