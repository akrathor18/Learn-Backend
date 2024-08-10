const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./database')
const port = 3000;
const User = require('./module/userSchema')
const passport = require('./auth')
const { jwAuthMiddleware, generateTokan } = require('./jwt')


require('dotenv').config()
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()}  request log `)
    next();
};


app.use(bodyParser.json())
app.use(logRequest)
app.use(passport.initialize());

const localauth = passport.authenticate('local', { session: false })

app.get('/users', jwAuthMiddleware, async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        console.error('Get users error:', error); // More detailed error logging
        res.status(500).json('Internal server error');
    }
});
app.post('/login', localauth, async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json('Username and password are required');
        }

        const user = await User.findOne({ name: username });

        if (!user) {
            return res.status(401).json('Invalid username ');
        }
        if (!(await user.comparePassword(password))) {
            return res.status(401).json('Invalid password');
        }

        const payload = {
            id: user._id,
            email: user.email,
            username: user.username
        };

        const token = generateTokan(payload);
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error); // More detailed error logging
        res.status(500).json('Internal server error');
    }
});

app.post('/singup', async (req, res) => {
    try {
        const data = req.body;
        const Newuser = new User(data)
        const resp = await Newuser.save()

        const Playlode = {
            id: resp._id,
            email: resp.email,
            username: resp.name
        }
        const tokan = generateTokan(Playlode)
        console.log('JWT tokan is:', tokan)
        console.log(Newuser);
        res.status(201).json(resp)
    } catch (error) {
        res.send(error)
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});