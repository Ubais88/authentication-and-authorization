const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = () => { 
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => {console.log("DB connection established")})
        .catch((error) => console.log("DB connection failed", error))

    }

module.exports = dbConnect