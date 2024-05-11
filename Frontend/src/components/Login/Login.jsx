import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateLogged } from "../../Redux/Slices/Slices";
import toast from "react-hot-toast";
import axios from "axios";
import GetData from "../getData/getdata";
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
  Input
} from '@chakra-ui/react';
const Login=()=>{
  let [user, setUser] = useState("");
    let [password, setPassword] = useState("");
     let dispatch = useDispatch();
     let logginStatus=useSelector(state=>state.isLogged.status);
     let adminStatus=useSelector(state=>state.isAdmin.status);
     console.log({logginStatus,adminStatus})
     let {fetchLoggedInfo}=GetData();
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
          fetchLoggedInfo();
          toast.success(response.data.message);
          dispatch(updateLogged({isLogged:response.data.isLogged,isAdmin:response.data.isAdmin}));
          onClose();
        }
      } catch (error) {
     toast.error(error.response.data.message);
      }
    };
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  return (
    <>
<NavLink to="#" onClick={onOpen}>Login</NavLink>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
        <form onSubmit={loginData}>
          <ModalHeader>Log-in Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input type="text" placeholder='Enter user-name' onChange={e=>setUser(e.target.value)} required/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder='Enter you password' onChange={e=>setPassword(e.target.value)} required/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme='blue' mr={3}>
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Login;
