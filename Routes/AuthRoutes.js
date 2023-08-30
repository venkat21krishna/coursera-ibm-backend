const express=require('express')
const router=express.Router()
const {authschema }=require('../helpers/validation-schema')
const User = require('../Models/user')
const jwt  = require('jsonwebtoken')

router.post('/signup', async (req,res)=>{
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({username});

        if(user)
            return res.status(400).json({message : "User already exist"});

        const newUser = new User({
            username : username,
            password : password
        })

        await newUser.save();

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({username});

        if(!user)
            return res.status(400).json({message : "Something went wrong"});

        if(password !== user.password)
            return res.status(400).json({message : "Something went wrong"})
        
        const token = await jwt.sign({userid : user._id}, process.env.JWT_SECRET)

        res.status(200).json(token);
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router;