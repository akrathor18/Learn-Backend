const express = require('express');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('./module/userSchema')

passport.use(new localStrategy(
    async (username, password, done) => {

        try {
            console.log('Received credentails', username, password)
            const user = await User.findOne({ name: username })
            if (!user) {
                return done(null, false, { message: 'User not found.' })
            }
            if (await user.password != password) {
                return done(null, false, { message: 'Incorrect password.' })
            }
            return done(null, user)

        } catch (error) {
            console.log("An error occure", error);
            return done(error)
        }

    }
))

module.exports= passport;