const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//-----------REGISTER CONTROLLER add new utilisateur------------//
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);

//------------------------create user-----------------------//
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

//--------------------create jwt token---------------------//
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.status(201).json({message: "User registered successfully",
      user: {id: user._id, name: user.name, email: user.email, role: user.role,}
      ,token,});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//----------------------LOGIN CONTROLLER-------------------//
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }
//=================create JWT token================//
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.status(200).json({
      message: "Login successful",
      token,
      user: {id: user._id, name: user.name, email: user.email, role: user.role,},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };

    //bcrypt : tachefir l pass (more secirise)
    //liberary dyl jwt f nodejs token we use it in authentication to know if user logged in or not
    //bcrypt : liberary ktsta3ml bach tchafer pass 9bl ma tkhazno f database
    //hash(): katakhod pass normal kat7awelo hash
    //10 : 9owat tachefir natijaa string mchafra s3iba
    //findone recherch dyl document 1 li kaytetab9 m3a filter katraj3 null
