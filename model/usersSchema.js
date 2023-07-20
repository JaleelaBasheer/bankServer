const mongoose= require('mongoose')
const usersSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    acno:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    transactions:{
        type:Array,
        required:true
    }
})

// create a model

const users = mongoose.model("users",usersSchema)

// Export model
module.exports = users