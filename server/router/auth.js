const bcrypt = require('bcrypt');
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
            }else if(password!=password) {
                return res.status(422).json({error:"Password not matching"});
            }
            else{
                const user = new User({name,email,phone,work,password,cpassword});
                // hashing pre here (using bcrypt from userSchema.js ) 
                await user.save()
                res.status(201).json({ message :"user registered" });
            }
    } catch(err){
        console.log(err);
    }
    }); 


// Login Route

    router.post('/login',async (req,res)=>{
        const {email,password} = req.body;

        if(!email || !password )
        return res.status(422).json({error:"Empty field"});
        
        try{
        const response = await User.findOne({email:email});
        if(response){
            const isMatch = await bcrypt.compare(password,response.password);
            if(isMatch)
                res.status(200).json({ message :"Login Successful" });
            else
                res.status(400).json({ error :"Incorrect Password" });

        }else{
            res.status(400).json({ error :"Incorrect email" });
        }
        }
        catch(err){
            console.log("Error, try again.")
        }
    })

module.exports = router;