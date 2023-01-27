const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
const adminSchema = require("./models/adminschema");
const userSchema = require("./models/userschema");
require("./db/conn");


const PORT = process.env.PORT||3000;
const static_path = path.join(__dirname,"./views");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.use(express.static(static_path));
app.get("/",(req,res)=>
{
    // res.send("hello");
    res.render("index");
})

app.get("/admin",async(req,res)=>
{
     const query = await adminSchema.find({});
     res.json({query});
     res.render("index");
    
})
app.post("/admin",async(req,res)=>
{
    const pass = req.body.password;
    phash = await bcrypt.hash(pass,10);
    const admin = new adminSchema({
        email:req.body.email,
        password:phash,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    })
    const ad = await admin.save();
    res.render("index");
})
app.get("/loginadmin/:email/:password",async(req,res)=>
{
    const em = req.params.email;
    const p = req.params.password;
    const adminemail = await adminSchema.findOne({email:em});
    if(adminemail)
    {
        const fuser = await adminSchema.find({$and:[{email:em},{password:adminemail.password}]});        
        if(fuser)
        {
            console.log(fuser);
             res.json({fuser})
        
        }
        else{
            res.send("signup");
            console.log("else");
        }
    }
    else
    {
        console.log("not found ");
    }
    res.render("loginuser");
})

app.get("/adduser",async(req,res)=>
{
    const query = await userSchema.find({});
     res.json({query});
    res.render("adduser");
})
app.post("/adduser",async(req,res)=>
{
    const phash = await bcrypt.hash(req.body.password,10);
    const user = new userSchema({
        email:req.body.email,
        password:phash,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    })
    const us = await user.save();
     res.render("index");
})

app.get("/deleteuser",async(req,res)=>
{
    const query = await userSchema.find({});
     res.json({query});
    res.render("deleteuser");
})
app.post("/deleteuser",async(req,res)=>
{
    const email = req.body.email;
    const del =  await userSchema.deleteOne({email});
    res.send("deleted");
})

app.get("/loginuser/:email/:password",async(req,res)=>
{
    const em = req.params.email;
    const p = req.params.password;
    const useremail = await userSchema.findOne({email:em});
    if(useremail)
    {
        const fuser = await userSchema.find({$and:[{email:em},{password:useremail.password}]});        
        if(fuser)
        {
             res.json({fuser})
        
        }
        else{
            res.send("signup");
            console.log("else");
        }
    }
    else
    {
        console.log("not found ");
    }
    res.render("loginuser");
})

app.get("/updateuser",async(req,res)=>
{
    const query = await userSchema.find({});
    res.json({query});
    res.render("updateuser");
})
app.put("/updateuser/:email",async(req,res)=>

{
    console.log("1");
    const upemail = req.params.email;
    const phash = await bcrypt.hash(req.body.password,10);
    const uemail = req.body.email;
    const fname = req.body.firstname;
    const lname = req.body.lastname;

    userSchema.findOneAndUpdate({email:upemail},{$set:{email:uemail , password:phash , firstname:fname , lastname:lname}},{new:true},(err,data)=>
    {
        if(data==null)
        {
            res.send("no found");
        }
        else{
            res.send(data);
        }
    })

})
app.listen(PORT,()=>
{
    console.log("listening on port 3000");
})