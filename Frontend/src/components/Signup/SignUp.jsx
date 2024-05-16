import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateLogged } from "../../Redux/Slices/Slices.js";
import toast from "react-hot-toast";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText
} from "@chakra-ui/react";
const SignUp = () => {
  // let [fname, setFname] = useState("");
  // let [lname, setLname] = useState("");
  // let [email, setEmail] = useState("");
  // let [user, setUser] = useState("");
  // let [password, setPassword] = useState("");
  // let [cpassword, setCpassword] = useState("");
  let dispatch = useDispatch();
let [userData,setUserData]=useState({});
  async function sendData(e) {
    e.preventDefault();
    try {
      if (userData.password === userData.cpassword) {
        let response = await axios.post(
          "http://localhost:4000/auth/signup",
          userData,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (response?.data?.isLogged === true) {
          toast.success(response.data.message);
          dispatch(updateLogged({isLogged:true,isAdmin:false}));
          onClose();
        }
      } else {
        toast.error("Password does not matched");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  // handlechange function to handle user data
  function handleChange(e){
let {name,value}=e.target;
setUserData(prev=>{
  let updateData={...prev,[name]:value}
  return updateData;
})
console.log(userData);
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <NavLink to="#" onClick={onOpen} mr={10}>Sign up</NavLink>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={sendData}>
            <ModalHeader>Log-in Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter First-name"
                  name="fname"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Last-name"
                  name="lname"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email"placeholder="Enter email"name="email" onChange={handleChange} required/>
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>User name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter user-name"
                  name="user"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Contact no.</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter phone number"
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter you password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>confirm-password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter confirm-password"
                  name="cpassword"
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignUp;
