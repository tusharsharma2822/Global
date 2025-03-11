import teacherModel from "../models/teacher.model.js";

export const createTeacher = async ({email, password}) => {
    
    if(!email || !password){
        throw new Error("All the fields are mandatory!");
    }

    const hashedPassword = await teacherModel.hashPassword(password);

    const teacher = await teacherModel.create({
        email,
        password: hashedPassword
    })

    return teacher;

}