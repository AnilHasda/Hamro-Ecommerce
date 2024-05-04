import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import axios from "axios";
import { useDispatch } from 'react-redux';
import {updateLogged} from "../../Redux/Slices/Slices.js";
const SignUp = () => {
  let [fname,setFname]=useState("");
  let [lname,setLname]=useState("");
  let [email,setEmail]=useState("");
  let [user,setUser]=useState("");
  let [password,setPassword]=useState("");
  let [cpassword,setCpassword]=useState("");
  let dispatch=useDispatch();
 async  function sendData(e){
    e.preventDefault();
    let formData={fname,lname,email,user,password};
try{
  if(password===cpassword){
let response=await axios.post("http://localhost:4000/auth/signup",formData,{
  withCredentials:true,
});
console.log(response.data)
alert(response.data.message);
if(response && response.data.userLogged===true){
dispatch(updateLogged());
}
  }
  else{
    alert("Password does not matched");
  }
}catch(error){
  console.log("error occurs while inserting data",error);
}
  }
  return (
    <div className='h-auto w-full bg-[blueviolet] text-white py-10'>
      <form className='m-auto w-[90%] md:w-[300px]'method="post"onSubmit={sendData}>
        <div className=' text-xl mb-8 font-semibold'><h3>Signup Form</h3></div>
        <label htmlFor='fname'className='font-semibold'>First-Name</label><br/>
        <input type="text"placeholder="enter first-name"id="fname" className='h-[35px] pl-5 w-full  m-auto rounded-sm mb-4 mt-[5px] border-none outline-none text-black'onChange={e=>setFname(e.target.value)}required/><br/>
        <label htmlFor='lname'className='font-semibold'>Last-Name</label><br/>
        <input type="text"placeholder="enter last-name"id="lname" className='h-[35px] pl-5 w-full  m-auto rounded-sm mb-4 mt-[5px] border-none outline-none text-black'onChange={e=>setLname(e.target.value)}required/><br/>
        <label htmlFor='email'className='font-semibold'>Email</label><br/>
        <input type="email"placeholder="enter email"id="email" className='h-[35px] pl-5 w-full  m-auto rounded-sm mb-4 mt-[5px] border-none outline-none text-black'onChange={e=>setEmail(e.target.value)}required/><br/>
        <label htmlFor='name'className='font-semibold'>User-Name</label><br/>
        <input type="text"placeholder="enter user-name"id="name" className='h-[35px] pl-5 w-full  m-auto rounded-sm mb-4 mt-[5px] border-none outline-none text-black'onChange={e=>setUser(e.target.value)}required/><br/>
        <label htmlFor='password'className='font-semibold'>Password</label><br/>
        <input type="password"placeholder="enter password"id="password" className='h-[35px] pl-5 w-full m-auto rounded-sm mb-4 mt-[5px] border-none outline-none text-black'onChange={e=>setPassword(e.target.value)}required/><br/>
        <label htmlFor='cpassword'className='font-semibold'>Confirm Password</label><br/>
        <input type="password"placeholder="enter confirm-password"id="cpassword" className='h-[35px] pl-5 w-full m-auto rounded-sm mb-4 mt-[5px] border-none outline-none text-black'onChange={e=>setCpassword(e.target.value)}required/><br/>
        <button type="submit"name="submit"className='h-[35px] w-full md:w-[120px] mt-5 bg-[#f1f1f1] text-black rounded-sm hover:bg-[#e6eaf0] transition duration-200'>submit</button>
      </form>
      <div className='m-auto w-[90%] md:w-[300px] mt-4'>already have account?<NavLink to="/login"><u>sign in</u></NavLink></div>
    </div>
  )
}

export default SignUp;