const express = require('express');
const app = express();
const port = 3000;
const user = require('./module/userShema'); // Ensure this filename matches
const database = require('./database');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(bodyParser.json());
app.use(session({
    secret: 'yourSecretKey', // Replace with your own secret key
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // Check if password is correct
        const isMatch = await user.comparePassword(password); // Ensure this method exists on your User schema
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/post', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new User(userData);
        const response = await newUser.save();
        console.log(response);
        res.status(201).json('User created successfully!');
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error');
    }
});

app.post('/login', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true 
}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
