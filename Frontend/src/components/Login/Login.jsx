import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLogged } from "../../Redux/Slices/Slices";
import toast from "react-hot-toast";
import axios from "axios";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Button,
//   FormControl,
//   FormLabel,
//   Input
// } from '@chakra-ui/react';
const Login = () => {
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");
   let dispatch = useDispatch();
   let logginStatus=useSelector(state=>state.isLogged.status);
   let adminStatus=useSelector(state=>state.isAdmin.status);
   console.log({logginStatus,adminStatus})
  const loginData = async (e) => {
    e.preventDefault();
    let data = { user, password };
    try {
      let response = await axios.post("http://localhost:4000/auth/login", data, {
        withCredentials: true,
      });
      setUser("");
      setPassword("");
      if (response.data.isLogged === true) {
        toast.success(response.data.message);
        dispatch(updateLogged({isLogged:response.data.isLogged,isAdmin:response.data.isAdmin}));
        window.history.back();
      }
    } catch (error) {
   toast.error(error.response.data.message);
    }
  };
  return (
    <div className="h-auto w-full bg-[blueviolet] text-white py-10">
      <form className="m-auto w-[90%] md:w-[300px]"onSubmit={loginData}>
        <div className=" text-xl mb-8 font-semibold">
          <h3>Login Form</h3>
        </div>
        <label htmlFor="user" className="font-semibold">
          User-Name
        </label>
        <br />
        <input
          type="text"
          placeholder="enter user-name"
          id="user"
          className="h-[35px] pl-5 w-full  m-auto rounded-sm mb-4 mt-[5px] border-none outline-none text-black"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          value={user}
          autoComplete="off"
          required
        />
        <br />
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <br />
        <input
          type="password"
          placeholder="enter password"
          id="password"
          className="h-[35px] pl-5 w-full m-auto rounded-sm mb-4 mt-[5px] border-none outline-none text-black"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          autoComplete="off"
          required
        />
        <br />
        <button
          type="submit"
          name="submit"
          className="h-[35px] w-full md:w-[120px] mt-5 bg-[#f1f1f1] text-black rounded-sm hover:bg-[#e6eaf0] transition duration-200"
        >
          submit
        </button>
      </form>
      <div className="m-auto w-[90%] md:w-[300px] mt-4">
        haven't account?
        <NavLink to="/signup">
          <u>create account</u>
        </NavLink>
      </div>
    </div>
  );
};
// const Login=()=>{
//   const { isOpen, onOpen, onClose } = useDisclosure()

//   const initialRef = React.useRef(null)
//   const finalRef = React.useRef(null)
//   return (
//     <>

//       <Modal
//         initialFocusRef={initialRef}
//         finalFocusRef={finalRef}
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Create your account</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>First name</FormLabel>
//               <Input ref={initialRef} placeholder='First name' />
//             </FormControl>

//             <FormControl mt={4}>
//               <FormLabel>Last name</FormLabel>
//               <Input placeholder='Last name' />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme='blue' mr={3}>
//               Save
//             </Button>
//             <Button onClick={onClose}>Cancel</Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }

export default Login;
