const express = require ('express');
const router =express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register

router.post('/register',async(req ,res)=>{

const {username, email, password}= req.body;
const hashed = await bcrypt.hash(password,10);
const user = new User({username, email, password:hashed});
await user.save();
res.json({msg: 'User registered'});

});

//login

router.post('/login',async (req,res)=>{
    const {email, password}=req.body;
    const user= await User.findOne({email});
    if(!user) return res.status(400).json({msg:'User not found'});
    const isMatch =await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.json({token,user:{id:user_id,username:user,username}});
});

module.export = router;