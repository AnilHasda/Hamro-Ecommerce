import bcrypt from "bcryptjs";
export async function  encodePassword(doc,next){
    if(!doc.isModified("password")){
        return next();
    }
    else{
        try{
        let hashed=await bcrypt.hash(doc.password,10);
        doc.password=hashed;
        }
        catch(error){
            return next(error);
        }
    }
}