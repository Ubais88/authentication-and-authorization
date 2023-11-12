const express = require("express");
const app = express();
app.use(express.json());

require('dotenv').config()
const PORT = process.env.PORT || 4000;

app.listen(PORT , () => {
    console.log('App is listening on port ',PORT);
})
app.get('/' , (req ,res)=> {
    res.send('<h1>Hello Ubais</h1>')
})

const dbConnect = require('./config/database')
dbConnect()


const router  = require('./routes/user')
app.use('/api/v1', router)