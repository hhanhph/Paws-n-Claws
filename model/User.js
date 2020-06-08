"use strict";
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const passportLocalMongoose=require('passport-local-mongoose');
const bcrypt = require("bcrypt")

var userSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        uniqueCaseInsensitive : true
    },
    password : {
        type : String, 
        required : true
    },
    
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: "Posts"}], 

       
});

userSchema.methods.getInfo = function() { 
    return `Username: ${this.username} Email: ${this.email} `
   };
userSchema.methods.findLocalUser = function() { 
    return this.model("User")
    .find({username: this.username})
    .exec(); 
   };
   userSchema.methods.passwordComparison = function(inputPassword){ 
    let user = this;
    return bcrypt.compare(inputPassword, user.password); 
   };
   
   userSchema.plugin(passportLocalMongoose, {
    usernameField: 'username'
  });
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);