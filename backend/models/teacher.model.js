import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const teacherSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, "Email must be atleast 5 characters long and a valid Address"],
        maxLength: [50, "Email must be atmost 50 characters long and a valid address"]
    },

    password: {
        type: String,
        required: true,
        select: false,
    }
});

teacherSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

teacherSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

teacherSchema.methods.generateToken = function() {
    return jwt.sign({ email: this.email },process.env.JWT_SECRET,{ expiresIn: '24h' });
}

const teacherModel = mongoose.model('teacher', teacherSchema);

export default teacherModel;