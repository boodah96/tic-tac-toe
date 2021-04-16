'use strict';

const mongoose= require('mongoose');

const usersSchema= new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    record:{type:Number}
});

const usersModel= mongoose.model('users',usersSchema);

module.exports=usersModel;