const express = require('express');
const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./database');
const cors = require('cors');
app.use(cors());

//config 
dotenv.config({path:"backend/config.env"});
//connecting database
connectDatabase();

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})
