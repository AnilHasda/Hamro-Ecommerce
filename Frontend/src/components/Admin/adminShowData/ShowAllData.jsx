import React from "react";
import useGetData from "../../getData/getdata";
import AdminNavigation from "../../adminNavigation/AdminNavigation";
import {
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
  Button
  } from '@chakra-ui/react'
const ShowAllData = () => {
  let response = useGetData();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  return (
    <div className="h-auto w-full flex flex-col md:flex-row lg:gap-[50px] pb-10 md:px-[20px] ">
      <AdminNavigation />
      <div className="h-auto w-full flex flex-wrap gap-5">
        {response.map((ele) => {
          return (
            <div
              key={ele._id}
              className="h-auto py-[20px] w-[98%] md:w-[30%] m-auto md:m-0 lg:w-[300px] bg-[#f1f1f1] text-center rounded-md"
            >
              <img
                src={`http://localhost:4000/${ele.item}`}
                alt={ele.name}
                className="w-full mb-4"
              />
              <div>
                <div className="flex justify-center">
                  <p className="font-bold text-md">Item:</p>
                  <p>{ele.name}</p>
                </div>
                <br />
                <button className="h-[35px] w-[80px] bg-blue-600 text-white rounded-md mt-[15px]"onClick={onOpen}>
                  Edit
                </button>
                {/*  update modal starts from here*/}
                <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


                {/* update modal end here */}
                <button className="h-[35px] w-[80px] bg-red-600 text-white ml-4 rounded-md mt-[15px]">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowAllData;
