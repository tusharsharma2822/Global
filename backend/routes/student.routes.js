import { Router } from "express";
import * as studentController from "../controllers/student.controller.js"; 
import { body } from "express-validator";

const router = Router();

router.post('/register', 
    body('email').isEmail().withMessage("Email must be a valid address"),
    body('password').isLength({min: 3}).withMessage("Password must be atleast 3 Characters long"),
    studentController.createStudentController
)

router.post('/login',
    body('email').isEmail().withMessage("Email must be a valid password"),
    body('password').isLength({min:3}).withMessage("Password must be atleast 3 Characters long"),
    studentController.studentLoginController
)

export default router