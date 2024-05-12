import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import ProfieNavigation from './ProfieNavigation';
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
   Image
} from '@chakra-ui/react';
const Profile = () => {
  let data=useSelector(state=>state.responseData);
  console.log(data);
  return (
    <div className='w-full h-auto flex px-10 gap-20 '>
      <ProfieNavigation/>
     <Card maxW='sm'my="40px">
  <CardBody>
    <h3 className='text-center font-bold text-md pb-4'>Your information</h3>
    <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'mx="auto"display="grid"placeContent="center">
      <Heading size='md'>Living room Sofa</Heading>
      <Heading size="sm">Email:anil@gmail.com</Heading>
      <Heading size="sm">Contact:anil@gmail.com</Heading>
<Heading size="sm">Location:anil@gmail.com</Heading>
          </Stack>
  </CardBody>
  <Divider />
  <CardFooter display="grid"placeContent="center">
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Edit Profile
      </Button>
      </ButtonGroup>
  </CardFooter>
</Card>
    </div>
  )
}

export default Profile