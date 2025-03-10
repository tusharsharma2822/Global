import mongoose from "mongoose";

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Connected to the Database');
    }).catch(err => console.log(err))
}

export default connectToDB;