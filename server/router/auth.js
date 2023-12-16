const express = require("express");
const router = express.Router();

require("../db/conn");
const User = require("../models/userSchema");


router.get('/',(req,res)=>{
    res.send("Hello world from backend router.js");
});

// Using Promises

// router.post('/register', (req,res)=>{

//     const {name,email,phone,work,password,cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword ){
//         return res.status(422).json({error : "One or more fields are empty"});
//     }

//     // console.log(req.body, "" ); // print in terminal
//     // res.json({message:req.body}); // print in postman

//     User.findOne({email:email}).then((userExists)=>{
//         if(userExists){
//             return res.status(422).json({error:"Email already exist"});
//         }
//         const user = new User({name,email,phone,work,password,cpassword});
        
//         user.save().then(()=>{
//             res.status(201).json({ message :"user registered" });
//         }).catch((err)=> res.status(500).json({error:"Failed to register"}));
//     }).catch(err=>{console.log(err);});
// }); 


// Using async-await

router.post('/register', async (req,res)=>{

    const {name,email,phone,work,password,cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword ){
        return res.status(422).json({error : "One or more fields are empty"});
    }

    // console.log(req.body, "" ); // print in terminal
    // res.json({message:req.body}); // print in postman

    try{
        const userExists = await User.findOne({email:email})
        if(userExists){
                return res.status(422).json({error:"Email already exist"});
            }

        const user = new User({name,email,phone,work,password,cpassword});
            
        await user.save()
        
        res.status(201).json({ message :"user registered" });
        
    } catch(err){
        console.log(err);
    }
    }); 

module.exports = router;