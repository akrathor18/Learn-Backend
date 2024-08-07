    const bodyParser = require('body-parser');
    const express = require('express');
    const passport = require('passport')
    const localStrategy = require('passport-local').Strategy
    const app = express();

    const db = require('./database')
    const user = require('./module/userShema')
    const port = 3000;

    const logRequest = (req, res, next) => {
        console.log(`${new Date().toLocaleString()}request log `)
        next();
    };


    app.use(bodyParser.json())
    app.use(logRequest)
    app.use(passport.initialize());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.post('/post', async (req, res) => {
        try {
            const data = req.body;
            const Newuser = new user(data)
            const resp = await Newuser.save()
            console.log(Newuser);
            res.status(201).json( resp)
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    })

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });