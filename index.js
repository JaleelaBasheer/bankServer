// Use packages
// Load .env file contents into process.env 
require('dotenv').config()

const express = require('express')
const cors = require('cors')
require('./db/connection')
const router = require('./routes/router')

const middleware= require('./middlewares/authMiddleware')


// Create an express application
const bankServer = express()

// use cors
bankServer.use(cors())
// use json parser in server
bankServer.use(express.json())

bankServer.use(middleware.appMiddleware)

// use router(it is given after cors and express)
bankServer.use(router)


// Setup port number to listen server
const port = 3000 || process.env.PORT

// run or listen server app
bankServer.listen(port,()=>{
    console.log(`Bank server started at port no:${port}`);
})

// get request
bankServer.get("/",(req,res)=>{
    res.status(200).send(`<h1>Bank server started</h1>`)
})