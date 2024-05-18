import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfieNavigation from "./ProfieNavigation";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
const Profile = () => {
  let [response, setResponse] = useState([]);
  let isLoggin = useSelector((state) => state.isLogged.status);
  // state for storing form data
  let [formData, setFormData] = useState();
  //  update modal variables
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  async function getData() {
    try {
      let { data } = await axios.get("http://localhost:4000/Profile", {
        withCredentials: true,
      });
      setResponse(data);
      setFormData({
        fname: data[0]?.fname,
        lname: data[0]?.lname,
        email: data[0]?.email,
        user: data[0]?.user,
        phone: data[0]?.phone,
        password: "",
        updatePassword: "",
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  //update function
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(
        "http://localhost:4000/Profile/updateProfile",
        formData,
        { withCredentials: true }
      );
        toast.success(data.message);
         getData();
         onClose();
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  };
  //function for handlechange
  function handleChange(e) {
    let { name, value } = e.target;
    setFormData((prev) => (prev = { ...prev, [name]: value }));
    console.log(formData);
  }
  return (
    <>
      {isLoggin === true ? (
        <div className="w-full h-auto flex flex-col md:flex-row md:px-10 sm:gap-2 md:gap-20 ">
          <ProfieNavigation />
          <Card maxW="400px" my="40px" mx={{ base: "auto", md: "0px" }}>
            {/* update modal */}
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <form onSubmit={updateProfile}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Update your profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>First name</FormLabel>
                      <Input
                        type="text"
                        name="fname"
                        value={formData?.fname}
                        ref={initialRef}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Last name</FormLabel>
                      <Input
                        type="text"
                        name="lname"
                        value={formData?.lname}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        value={formData?.email}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>User name</FormLabel>
                      <Input
                        type="text"
                        name="user"
                        value={formData?.user}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Phone</FormLabel>
                      <Input
                        type="number"
                        name="phone"
                        value={formData?.phone}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Initial password</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        value={formData?.password}
                        onChange={handleChange}
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>New password</FormLabel>
                      <Input
                        type="password"
                        name="updatePassword"
                        value={formData?.updatePassword}
                        onChange={handleChange}
                        placeholder="optional field"
                      />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" colorScheme="blue" mr={3}>
                      Update
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </form>
            </Modal>
            <CardBody w="300px">
              <h3 className="text-center font-bold text-md pb-4">
                Your information
              </h3>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_3rJi7SF2VWHMAc1D7buA8XGV60lUMQQ2UVEBQD1Aq1T25e9WQSew4wcoug&s"
                borderRadius="lg"
                className="m-auto"
              />
              <Stack
                mt="6"
                spacing="3"
                mx="auto"
                display="grid"
                placeContent="center"
              >
                <div className="flex gap-1">
                  <h3 className="text-sm font-semibold">welcome</h3>
                  <h4 className="font-bold text-sm">{response[0]?.user}!</h4>
                </div>
                <div className="flex gap-1">
                  <h3 className="text-sm font-semibold">Full Name:</h3>
                  <h4 className="font-bold text-sm">
                    {response[0]?.fname} {response[0]?.lname}
                  </h4>
                </div>
                <div className="flex gap-1">
                  <h3 className="text-sm font-semibold">Email:</h3>
                  <h4 className="font-bold text-sm">{response[0]?.email}</h4>
                </div>
                <div className="flex gap-1">
                  <h3 className="text-sm font-semibold"> Contact:</h3>
                  <h4 className="font-bold text-sm">{response[0]?.phone}</h4>
                </div>
                <div className="flex gap-1">
                  <h3 className="text-sm font-semibold"> Location:</h3>
                  <h4 className="font-bold text-sm">Kathmandu</h4>
                </div>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter display="grid" placeContent="center">
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue" onClick={onOpen}>
                  Edit Profile
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="h-auto w-full py-10 text-center font-bold">
          <p>Please login to continue!</p>
        </div>
      )}
    </>
  );
};

export default Profile;
