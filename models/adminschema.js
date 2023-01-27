const mongoose = require("mongoose");

const adminschema = new mongoose.Schema({
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

const Register = new mongoose.model("Register",adminschema);
module.exports = Register;