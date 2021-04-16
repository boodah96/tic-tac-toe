'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose= require('mongoose');
const userModle= require('./modles/users');
const Data= require('./modles/data');
const User= new Data(userModle);


app.use(cors());
app.set('view engine', 'html');

const PORT=3000;

app.get('/signup',handleSignup);
app.post('/user',handleUsers);




function handleSignup(req,res){
    res.render('login');
}

function handleUsers(req,res){
    let body=req.body;
    let username=body.username;
    let password=body.password;

    let userObj={
        username:username,
        password:password
    }

    User.creat(userObj);
    // ayoub should re direct tro join room route
    res.redirect('/joinRoom');

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

