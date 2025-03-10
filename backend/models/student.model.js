import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: [5, 'Email must be atleast 5 character long']
    },

    password: {
        type: String,
        required: true,
        select: false
    }
})

studentSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

studentSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

studentSchema.methods.generateToken = function () {
    return jwt.sign({ email: this.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const studentModel = mongoose.model('student', studentSchema);

export default studentModel;