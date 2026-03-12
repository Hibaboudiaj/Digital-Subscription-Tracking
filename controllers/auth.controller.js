const User = require("./models/user.model")
//bcrypt : tachefir l pass (more secirise)
const bcrypt = require("bcrypt")
//liberary dyl jwt f nodejs token we use it in authentication to know if user logged in or not
const jwt = require('jsonwebtoken')

//-----------------REGISTER CONTROLLER------------------//
const register = async (req, res) =>{
    try {
        const {name, email, password} = req.body;
        //findone recherch dyl document 1 li kaytetab9 m3a filter katraj3 null

//-------------------------verify si email existe-----------------------------//
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already exists"});
        }
        //bcrypt : liberary ktsta3ml bach tchafer pass 9bl ma tkhazno f database
        //hash(): katakhod pass normal kat7awelo hash 
        //10 : 9owat tachefir natijaa string mchafra s3iba
        const hashedPassword = await bcrypt.hash(password, 10);

//-------------------------------------create user-------------------------------------//
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

//-----------------------------------create jwt token-------------------------------------//
        const token = jwt.sign(
            { id : user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn : "1d"}
        );

//---------------------------------------rad bi naja7----------------------------------------//
         res.status(201).json({
            message : "User registered successfully",
            user:{id:user._id, name: user.name, email: user.email, role:user.role},
            token,
         });
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {register}