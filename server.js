const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// --------- controllers------------
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'mars1385',
        database : 'smartbarin'
    }
  });

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/' , (req , res) =>{res.send(dataBase.user);});

app.post('/signin' , signin.handelSignIn(db , bcrypt));

app.post('/register' , (req , res) =>{ register.handelRegister(req ,res , db, bcrypt)});

app.get('/profile/?:id' , (req , res ) => {profile.handelProfile(req , res , db)});

app.put('/image' , (req , res) => {image.handelImage(req , res ,db)});

app.post('/imageurl' , (req , res) => {image.handelApi(req , res )});

app.listen(3000); 