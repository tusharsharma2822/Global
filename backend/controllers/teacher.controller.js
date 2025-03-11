import teacherModel from "../models/teacher.model.js";
import * as teacherService from "../services/teacher.service.js";
import { validationResult } from "express-validator";

export const createTeacherController = async (req, res) => {
    
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        
        const teacher = await teacherService.createTeacher(req.body);

        const token = await teacher.generateToken();

        return res.status(201).json({teacher, token});

    } catch (err) {
        return res.status(400).send(err.message);
    }

}