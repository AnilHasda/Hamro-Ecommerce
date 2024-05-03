import jwt from "jsonwebtoken";
const tokenGenerator=(data,secret_key)=>{
    let token=jwt.sign(data,secret_key);
    return token;
}
export {tokenGenerator};