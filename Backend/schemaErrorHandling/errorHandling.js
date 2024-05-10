//this file handle error occurs during validation errro
const validationError=(error,resp)=>{
    let errorMessages =
      error.errors &&
      Object.values(error.errors).map((ele) => ele.message);
    if (errorMessages) {
      let errorMessage = errorMessages[errorMessages.length - 1];
      resp.status(500).json({message:errorMessage});
    } 
}
//duplicate error handling function
const duplicateErrorHandling=(error,resp)=>{
    if (error.code === 11000 && error.keyPattern.email) {
        resp.status(500).json({message:`email  ${error.keyValue.email} already exist`});
      }
       else if (error.code === 11000 && error.keyPattern.user) {
        resp.status(500).json({message:`username ${error.keyValue.user} already exist`});
      }
      else{
        resp.status(500).json({messasge:"internal error"});
      }
}
export {validationError,duplicateErrorHandling};