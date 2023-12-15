const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Hello world from backend router.js");
});

router.post('/register', (req,res)=>{
    console.log(req.body); // print in terminal
    res.json({message:req.body}); // print in postman
    // res.send("Register is working");
}); 

module.exports = router;