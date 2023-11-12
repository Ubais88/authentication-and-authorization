const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

// signup
exports.signup = async(req , res) => {
    try{
        const {name , email , password , role} = req.body;
        // user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(400).json({
                success:false,
                message: 'User already exists with this email address'
            })
        }
        // securepassword
        let hashedPassword ;
        try{
            hashedPassword = await bcrypt.hash(password , 10);
            const savedUser = await User.create({name,email,password:hashedPassword,role})
            res.status(200).json({
               success: true,
               user: savedUser,
               message: "User created successfully"
           })
       
        }
        catch(error){
            res.status(401).json({
               success: false,
               error: error.message,
               message: "error in hashing password"
           })
        }
    }
    catch(error){
        console.log(error);
        res.status(401).json({
            success: false,
            error: error.message,
            message: "Something went wrong"
        })
    }
}



// login
exports.login = async(req , res) => {
    try{
       const {email , password} = req.body;
       if(!email || !password){
        return res.status(401).json({
            success: false,
            message: "All fields are required"
        })
       }

       let savedUser = await User.findOne({email});

       if(!savedUser){
            console.log("user not found")
            res.status(500).json({
                success: false,
                message: "email is not registered"
            })
        }
        const payload = {
            email: savedUser.email,
            id: savedUser._id,
            role: savedUser.role
        }

        if(await bcrypt.compare(password,savedUser.password)){
            
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                                 {
                                    expiresIn:'2h'
                                 })

            console.log(typeof(savedUser))
            savedUser = savedUser.toObject()
            console.log(typeof(savedUser))
            savedUser.token = token;
            savedUser.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                
            }

            res.cookie("UbaisCookie", token , options).status(200).json({
                success:true,
                token:token,
                savedUser:savedUser,
                message:"user logged in successfully"
            })
        }

        else{
            console.log("password mismatch")
            res.status(401).json({
                success: false,
                message: "Passwords do not match"
            })
        }

    } 

    catch(error){
        console.log(error);
        res.status(404).json({
            success: false,
            error: error.message,
            message: "Something went wrong"
        })
    }
}