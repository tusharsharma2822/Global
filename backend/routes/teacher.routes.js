import { Router } from "express";
import { body } from "express-validator";
import * as teacherController from "../controllers/teacher.controller.js";

const router = Router();

router.post('/register', 
    body('email').isEmail().withMessage("Email must be a valid Email Address"),
    body('password').isLength({min:3}).withMessage("Password must be atleast 3 characters long"),
    teacherController.createTeacherController
)

router.post('/login', 
    body('email').isEmail().withMessage("Email must be a valid email address"),
    body('password').isLength({min:3}).withMessage("Password must be atleast 3 characters long"),
    teacherController.teacherLoginController
)

export default router;