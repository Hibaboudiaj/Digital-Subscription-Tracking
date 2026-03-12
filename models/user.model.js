const mongoose = require("mongoose");
//schema howa structure dyl bayanat li aytkhazno f mongodb
//new kansta3mloha bach nsawebo objet jdid mn class ou function (instance)
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
//mongoose.model(): schema => model 
//saweb model smito User i3timadan 3la userSchema
//model howa li kansta3mloh bach nt3amlo m3a data f mongodb
const User = mongoose.model("User", userSchema);

module.exports = User;