const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }

})

userSchema.pre('save', async function(next) {
    const user= this;
    if(!user.isModified('password')) return next()
    try {
        const salt= await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password= hashedPassword;
        next()
    } catch (error) {
        return next(error)
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

const user =  mongoose.model('user', userSchema)

module.exports= user;