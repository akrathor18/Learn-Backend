    const bodyParser = require('body-parser');
    const express = require('express');
    const app = express();

    const db = require('./database')
    const port = 3000;
    const User = require('./module/userSchema')
    const passport = require('./auth')
    const logRequest = (req, res, next) => {
        console.log(`${new Date().toLocaleString()}  request log `)
        next();
    };


    app.use(bodyParser.json())
    app.use(logRequest)
    app.use(passport.initialize());

    const localauth= passport.authenticate('local', {session:false})
    app.get('/login',localauth, (req, res) => {
        res.send('Hello World!');
    });

    app.post('/singup', async (req, res) => {
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

   

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });