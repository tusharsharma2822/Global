import studentModel from "../models/student.model.js";

export const createStudent = async ({ email, password }) => {

    if(!email || !password){
        throw new Error("All the fields are required");
    }

    const hashedPassword = await studentModel.hashPassword(password);

    const student = await studentModel.create({
        email,
        password: hashedPassword
    })

    return student;
}