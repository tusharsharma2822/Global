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