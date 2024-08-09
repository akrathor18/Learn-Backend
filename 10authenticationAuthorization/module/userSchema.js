const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique:true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    }

})

userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        console.log('Candidate Password:', candidatePassword);
        console.log('Stored Password Hash:', this.password);
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        console.log('Password Match:', isMatch);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Password comparison failed');
    }
};


const user =  mongoose.model('user', userSchema)

module.exports= user;