require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/usermodel');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
},(accessToken,refreshToken,profile,done)=>{
    console.log('passport callback fired');
    User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
            //if user in database
            console.log(`user is ${currentUser}`);
            done(null,currentUser);
        }else{
            //if user not in database
            new User({
                username: profile.displayName,
                googleId: profile.id
            }).save().then((newUser)=>{
                console.log(`new user ${newUser}`);
                done(null,newUser);
            });
        }
    })
    
})
);
