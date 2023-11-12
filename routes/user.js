const express = require('express');
const router = express.Router();


const {login  ,signup} = require('../controller/Auth');
const {auth , isStudent , isAdmin} = require('../middleware/auth')


router.post('/login', login)
router.post('/signup', signup)

router.get('/test', auth , (req , res) => {
    res.json({
        success:true,
        message:"you are on the test routes"
    })
})

router.get('/students', auth , isStudent , (req , res) => {
    res.json({
        success:true,
        message:"welcome to the student routes"
    })
})

router.get('/admin', auth , isAdmin , (req , res) => {
    res.json({
        success:true,
        message:"welcome to the admin routes"
    })
})


module.exports = router