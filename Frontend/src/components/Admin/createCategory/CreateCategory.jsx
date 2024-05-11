import React, { useState } from "react";
import AdminNavigation from "../../adminNavigation/AdminNavigation";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Button,
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
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { BiSolidEdit } from "react-icons/bi";
import GetData from "../../getData/getdata";

const CreateCategory = () => {
  let [category, setCategory] = useState("");
  let [updateData,setUpdateData]=useState("");
  let categoryList = useSelector((state) => state.category);
  // chakra modal variables
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  // 

  let { fetchCategory } = GetData();
  //function to insert new category
  const insertCategory = async (e) => {
    e.preventDefault();
    try {
      console.log(category);
      let { data } = await axios.post(
        "http://localhost:4000/admin/createCategory",
        { category },
        { withCredentials: true }
      );
      if (data) {
        toast.success(data.message);
        fetchCategory();
      }
    } catch (error) {
      toast.error(error.data.message);
    }
  };
  //funciton to delete data
  const deleteCategory = async (id) => {
    let confirmDelte = confirm("Do you really want to delete category?");
    if (confirmDelte) {
      try {
        let { data } = await axios.delete(
          "http://localhost:4000/admin/deleteCategory/"+id,
          { withCredentials: true }
        );
        if (data) {
          toast.success(data.message);
          fetchCategory();
        }
      } catch (error) {
        toast.error(error.data.message);
      }
    }
  };
  //function to update category
  const updateCategory = async (id) => {
      try {
        let { data } = await axios.put(
          "http://localhost:4000/admin/updateCategory/"+id,
          { withCredentials: true }
        );
        if (data) {
          toast.success(data.message);
          fetchCategory();
        }
      } catch (error) {
        toast.error(error.data.message);
      }
  };
  return (
    <>
                        {/* Chakra update modal */}

     
                        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
     
        <ModalOverlay />
        <form>
        <ModalContent>
          <ModalHeader>Update Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input type="text"value={updateData} onChange={e=>setUpdateData(prev=>!prev ? ele.category : e.target.value)}ref={initialRef} />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme='blue' mr={3}>
              update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
        </form>
      </Modal>
      {/* update modal end here */}
    <div className="h-auto w-full flex flex-col md:flex-row md:px-5">
      <AdminNavigation />
      <div className="createCategory mt-10  flex-grow flex flex-col items-center">
        <h3 className="text-center font-bold text-xl  pb-10">
          Add New Category
        </h3>
        <form onSubmit={insertCategory}>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 w-[95vw] md:w-[80%] mx-auto justify-center mb-10 ">
            <Input
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter new category"
              w={{ base: "full", md: "55%" }}
              required
              autoComplete="off"
            />
            <Button type="submit" colorScheme="blue" ml={2}>
              Add category
            </Button>
          </div>
        </form>
        <TableContainer
          w={{ base: "full", md: "50vw", xl: "700px" }}
          pl={{ sm: "30px", md: "50px" }}
          textAlign="center"
        >
          <Table variant="simple" w="full">
            <TableCaption>Review before deleting any item</TableCaption>
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th visibility="hidden" display={{ base: "none" }}>
                  category
                </Th>
                <Th colSpan={2}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categoryList.map((ele, index) => {
                return <div key={index}>
                  <Tr key={index}>
                    <Td>{ele.category}</Td>
                    <Td visibility="hidden" display={{ base: "none" }}>
                      hello
                    </Td>
                    <Td display="flex" gap={20}>
                      <FiTrash2 size={25} onClick={()=>{deleteCategory(ele._id)}}/>
                      <BiSolidEdit size={25} onClick={onOpen}/>
                    </Td>
                  </Tr>
                </div>
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
    </>
  );
};

export default CreateCategory;
