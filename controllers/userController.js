const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userSchema, loginSchema } = require('../helpers/validateData');
const asyncHandler = require('express-async-handler');


const registerController = asyncHandler(async (req, res) => {
    
    const result = await userSchema.validateAsync(req.body);
    console.log(result);

    const existingUser = await User.findOne({ email: result.email });
    if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
    }

    // Create user details
    const user = new User(result);
    await user.save();

    // Store the user id
    const user_Id = user._id;
    console.log(user_Id);

    // Response
    res.status(200).send({ user, user_Id, message: "User created successfully!" })
})

//login
const loginController = asyncHandler(async (req, res) => {
    const login_result = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: login_result.email });

    if (!user) {
        return res.status(401).json({message : "User not registered!"})
    }

    const isMatch = await bcrypt.compare(login_result.password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Password does not match" });
    }

    const accessToken = jwt.sign({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "180m" });
    

    res.status(200).send({ accessToken, message: "Logged In successfully!" });
})

//Retrieve users
const getUsers = asyncHandler(async(req,res)=>{
    const user_result = await User.find({}).populate('tasks')
    const totalUsers = await User.countDocuments()
    if(!user_result){
        res.status(404).json({message : "User result not retrieved successfully!"})
    }

    res.status(200).json({data : user_result ,users : totalUsers,  message : "Users retrieved successfully!"})
})

module.exports = {registerController,loginController,getUsers}