//this file handle error occurs during validation errro
const validationError=(error,resp)=>{
    let errorMessages =
      error.errors &&
      Object.values(error.errors).map((ele) => ele.message);
    if (errorMessages) {
      let errorMessage = errorMessages[errorMessages.length - 1];
      resp.send({message:errorMessage});
    } 
}
//duplicate error handling function
const duplicateErrorHandling=(error,resp)=>{
    if (error.code === 11000 && error.keyPattern.email) {
        resp.send({message:`email  ${error.keyValue.email} already exist`});
      }
       else if (error.code === 11000 && error.keyPattern.user) {
        resp.send({message:`username ${error.keyValue.user} already exist`});
      }
      else{
        resp.send({messasge:"internal error"});
      }
}
export {validationError,duplicateErrorHandling};