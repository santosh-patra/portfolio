import jwt from 'jsonwebtoken';
const secret = "highlevelsecret"


export const requireSignin = async(req,res,next)=>{
    let token = req.headers.authorization;
    if(!token){
        return res.status(200).send({
            success:false,
            message:"Please provide token value"
        })
    }
    console.log("from header TOken--->",token);
    let decodedValue = await jwt.verify(token,secret);
    req.user = decodedValue;
    next();
} 

export const isAdmin = async(req,res,next)=>{
    let token = req.headers.authorization;
    if(!token){
        return res.status(200).send({
            success:false,
            message:"Please provide token value"
        })
    }
    console.log("from header TOken--->",token);
    let decodedValue = await jwt.verify(token,secret);
    // console.log(decodedValue);
    if(decodedValue.role ===0){
        return res.status(200).send({
            success:false,
            message:"You are not authorised to access this site."
        })
    }
    else{
        next();
    }
}