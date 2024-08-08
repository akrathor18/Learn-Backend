    const bodyParser = require('body-parser');
    const express = require('express');
    const passport = require('passport')
    const localStrategy = require('passport-local').Strategy
    const app = express();

    const db = require('./database')
    const User = require('./module/userSchema')
    const port = 3000;

    const logRequest = (req, res, next) => {
        console.log(`${new Date().toLocaleString()}  request log `)
        next();
    };


    app.use(bodyParser.json())
    app.use(logRequest)
    app.use(passport.initialize());

    app.get('/',passport.authenticate('local', {session:false}), (req, res) => {
        res.send('Hello World!');
    });

    app.post('/post', async (req, res) => {
        try {
            const data = req.body;
            const Newuser = new User(data)
            const resp = await Newuser.save()
            console.log(Newuser);
            res.status(201).json( resp)
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    })

    passport.use(new localStrategy(
        async (username, password, done) => {   

            try {
                console.log('Received credentails', username, password)
                const user = await User.findOne({ name: username })
                if(!user){
                    return done(null, false, { message: 'User not found.' })
                }
                if( await user.password!=password){
                    return done(null, false, { message: 'Incorrect password.' })
                }
                return done(null, user)

            } catch (error) {
                console.log("An error occure", error);
                return done(error)
            }

        }
    ))

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });