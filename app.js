require('dotenv').config()
const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup')
const connectDB = require('./db/connect');
const passport = require('passport');
const session = require('express-session');

const app = express();
const port = 3000;

app.set('view engine','ejs');

app.use(session({
   secret: process.env.SECRET_COOKIE,
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

connectDB(process.env.MONGO_URI)

app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(port,()=>{
    console.log(`Server started at port number ${port}`);
})