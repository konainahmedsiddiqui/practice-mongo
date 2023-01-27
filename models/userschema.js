const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    email:{
    type:String,
    required:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    }
})

const Userschema = new mongoose.model("Userschema",userschema);
module.exports = Userschema;