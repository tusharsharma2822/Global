import { validationResult } from "express-validator";
import studentModel from "../models/student.model.js";
import * as studentService from "../services/student.service.js";

export const createStudentController = async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        const student = await studentService.createStudent(req.body);

        const token = await student.generateToken();

        return res.status(201).json({student, token});

    }catch(err) {
        return res.status(400).send(err.message);
    }
}

export const studentLoginController = async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { email, password } = req.body;
        
        const student = await studentModel.findOne({email}).select('+password');

        if(!student){
            return res.status(400).json({
                message: "Student Already Exists"
            })
        }

        const isMatch = await student.isValidPassword(password);

        if(!isMatch){
            return res.status(400).json({
                message: "Password doesn't match!"
            })
        }

        const token = await student.generateToken();

        return res.status(200).json({student, token});
        
    } catch(err) {
        return res.status(400).json(err.message);
    }
}