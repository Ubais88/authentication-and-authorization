const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.auth = (req , res , next) => {
    try{
        const token = req.body.token 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found"
            })
        }
        // verify that the token
        try{
            console.log(token)
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            console.log("decode token", decode)

            req.savedUser = decode
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(404).json({
            success:false,
            message:"something went wrong"
        })
    }
}

exports.isStudent = (req , res , next) => {
    try{
        if(req.savedUser.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"Route for student only"
            })
        }
        next()
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role not verified"
        })
    }
}

exports.isAdmin = (req , res , next ) => {
    try{
        if(req.savedUser.role !== "Admin"){
            return res.status(402).json({
                success:false,
                message:"this route is only for admin"
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Admin role not verified"
        })
    }
}



