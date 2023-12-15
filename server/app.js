const dotenv= require("dotenv");
const express = require("express");
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');

const PORT = process.env.PORT;

// Midddleware
const midddleware = (req,res,next) =>{
    console.log("Hello my middleware");
    next();
}

app.get('/',(req,res)=>{
    res.send("Hello world from backend");
});

app.get('/about',midddleware,(req, res)=>{
    res.send("About Me Section");
});

app.get('/contact',(req,res)=>{
    res.send("Contact us at bhosaleshlok@gmail.com");
});

app.get('/login',(req,res)=>{
    res.send("Enter your email id and password");
});

app.get('/register',(req,res)=>{
    res.send("Register before logging in");
});

app.listen(PORT,()=>{    
    console.log('Server is running at port',PORT);
});