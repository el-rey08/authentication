const mongoose = require('mongoose')

const dotevn = require('dotenv').config()

const Url = process.env.DATABASE_URL

mongoose.connect(Url)
.then(()=>{
    console.log('connection successfull');
}).catch((error)=>{
    console.log('connection failed',error.message);
})