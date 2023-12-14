const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello world from backend");
});

app.get('/about',(req,res)=>{
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

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})
