import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfieNavigation from "./ProfieNavigation";
import axios from "axios";
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
  let isLoggin=useSelector(state=>state.isLogged.status);
  //  update modal variables
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  useEffect(() => {
    async function getData() {
      console.log("i am called")
      try{
      let { data } = await axios.get("http://localhost:4000/Profile", {
        withCredentials: true,
      });
      setResponse(data);
      console.log(data);
    }catch(error){
      console.log(error);
    }
    }
    getData();
  }, []);
  return (
    <>
      {isLoggin===true ?
        <div className="w-full h-auto flex px-10 gap-20 ">
      <ProfieNavigation />
      <Card maxW="sm" my="40px">
        {/* update modal */}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update your profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>User name</FormLabel>
                <Input ref={initialRef} placeholder="User name" />
              </FormControl>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input placeholder="First name" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="Last name" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3}>
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
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
    </div> :<div className="h-auto w-full py-10 text-center font-bold"><p>Please login to continue!</p></div>}
    </>
  );
};

export default Profile;
