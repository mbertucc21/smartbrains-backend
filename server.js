const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'password',
    database : 'smartbrain'
  }
});

// db.select('*').from('users').then(data => {
//   console.log(data);
// });

// app = express()
const app = express();

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());

// DATABASE
// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'John',
//       email: 'john@gmail.com',
//       password: 'cookies',
//       entries: 3,
//       joined: new Date()
//     },
//     {
//       id: '124',
//       name: 'Sally',
//       email: 'sally@gmail.com',
//       password: 'bananas',
//       entries: 0,
//       joined: new Date()
//     }
//   ],
//   // login: [
//   //   {
//   //     id: '987',
//   //     hash: '',
//   //     email: 'john@gmail.com'
//   //   }
//   // ]
// }

app.get('/', (req, res) => {
  // res.send('this is working');
  res.send(database.users);
})

// SIGN IN
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

// REGISTER
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// PROFILE/:userID
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// IMAGE
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

// LISTEN
app.listen(3000, () => {
  console.log('app is running on port 3000');
})

/* TASKS:
/ --> res = this is working
/ signin --> POST = success/fail
/ register --> POST = user
/ profile/:userID --> GET = userID
/ image --> PUT = user
*/
