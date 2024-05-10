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
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [email, setEmail] = useState("");
  let [user, setUser] = useState("");
  let [password, setPassword] = useState("");
  let [cpassword, setCpassword] = useState("");
  let dispatch = useDispatch();
  async function sendData(e) {
    e.preventDefault();
    let formData = { fname, lname, email, user, password };
    try {
      if (password === cpassword) {
        let response = await axios.post(
          "http://localhost:4000/auth/signup",
          formData,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (response && response.data.userLogged === true) {
          dispatch(updateLogged());
          toast.success(response.data.message);
          onClose();
        }
      } else {
        toast.error("Password does not matched");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Last-name"
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input type="email"placeholder="Enter email" onChange={e=>setEmail(e.target.value)} required/>
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>User name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter user-name"
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter you password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>confirm-password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter confirm-password"
                  onChange={(e) => setCpassword(e.target.value)}
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
