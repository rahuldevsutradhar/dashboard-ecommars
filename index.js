// ----------------------all require ----------------
require('dotenv').config();
const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const dbconnection = require('./db');
const  route  = require('./src/Routers/router');


// ------------------ middelware ------------------
app.use(express.json())
app.use(cors())
app.use(route)


// ------- database connected ---------
dbconnection()



// ---------------------server runing ------------
app.listen(port, ()=>{
    console.log(`this server is runing at ${port}`);
    
})
