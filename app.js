'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose= require('mongoose');
const userModle= require('./public/modles/users');
const Data= require('./public/modles/data');
const User= new Data(userModle);


app.use(cors());
app.set('view engine', 'html');

app.use(express.urlencoded({ extended: true }));

const PORT=3030;

app.get('/signup',handleSignup);
app.post('/user',handleUsers);




function handleSignup(req,res){
    res.render('login');
}

function handleUsers(req,res){
    console.log('helllllo');
    let body=req.body;
    let username=body.username;
    let password=body.password;

    let userObj={
        username:username,
        password:password
    }

    User.creat(userObj);
    // ayoub should re direct tro join room route

    res.redirect('index');

}

const option = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

mongoose
  .connect("mongodb://localhost:27017/users",option)
  .then(() => {
    app.listen(PORT, () => console.log('Up'));
  })
  .catch((e) => console.log(e));

