require("dotenv").config();
require("./config/DBC");
// import expressd
const express = require("express");

const userRouter = require('./router/userRouter')

//create an instance of the express app
const app = express();

// call the middle for data creation
app.use(express.json());

app.use(userRouter)

const PORT = process.env.PORT || 1010
// use the instance app to create a server
app.listen(PORT, ()=>{
    console.log(`Server is listening to port: ${PORT}`)
});