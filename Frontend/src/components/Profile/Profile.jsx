import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import ProfieNavigation from './ProfieNavigation';
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
    Input
} from '@chakra-ui/react';
const Profile = () => {
  let [response,setResponse]=useState([]);
  //  update modal variables
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


  useEffect(()=>{
async function getData(){
let {data}=await axios.get("http://localhost:4000/Profile",{withCredentials:true});
setResponse(data);
console.log(data)
}
getData();
  },[])
  return (
    <div className='w-full h-auto flex px-10 gap-20 '>
      <ProfieNavigation/>
     <Card maxW='sm'my="40px">
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
              <Input ref={initialRef} placeholder='User name' />
            </FormControl>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

  <CardBody>
    <h3 className='text-center font-bold text-md pb-4'>Your information</h3>
    <Image
      src=""
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'mx="auto"display="grid"placeContent="center">
      <Heading size='md'>{response[0]?.user}</Heading>
      <Heading size="sm">Name:{response[0]?.fname} {response[0]?.lname}</Heading>
      <Heading size="sm">Email:{response[0]?.email}</Heading>
      <Heading size="sm"> contact</Heading>
<Heading size="sm">Location:anil@gmail.com</Heading>
          </Stack>
  </CardBody>
  <Divider />
  <CardFooter display="grid"placeContent="center">
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'onClick={onOpen}>
        Edit Profile
      </Button>
      </ButtonGroup>
  </CardFooter>
</Card>
    </div>
  )
}

export default Profile