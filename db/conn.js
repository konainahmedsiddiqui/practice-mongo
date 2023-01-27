const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/user",{
    useNewUrlParser:true,
   
}).then(()=>
console.log("db")).catch((err)=>
console.log(err))