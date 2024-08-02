const express = require('express')
const route = express.Router()
const users = require('./../models/UserShema')

route.post('/', async (req, res) => {
    try {
        const userData = req.body
        const newUser = new users(userData)
        const response = await newUser.save()
        console.log(response);
        res.status(201).json('User created secussefully!')

    } catch (err) {
        console.log(err);
        res.status(500).json('Internal server error')

    }
})

route.get('/', async (req, res) => {
    try {
        const data = await users.find()
        res.status(200).json(data)

    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }
})

route.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const updatedData = req.body

        const response = await users.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        })

if(!updatedData){
    res.status(404).json('ud not found ')

}
        console.log(response);

        res.status(200).json('Data updated ')
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }
})

module.exports = route;
