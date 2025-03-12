import jwt from "jsonwebtoken";

export const authUser = async(req, res, next) => {
    
    try{
       
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if(!token){
            return res.status(401).send({error: "Unauthorize User"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }catch(err){
        return res.status(401).send({err: "Unauthorized User"});
    }

}