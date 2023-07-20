const mongoose = require('mongoose')

// get db connection string

const connectionString = process.env.DATABASE

mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("MongodB Atlas Connected successfully....");
}).catch((err)=>{
    console.log(`MongodB Atlas Connection Failed,${err}`);
})

