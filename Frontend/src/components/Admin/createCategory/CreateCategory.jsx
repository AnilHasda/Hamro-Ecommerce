import React from 'react';
import AdminNavigation from '../../adminNavigation/AdminNavigation';
import {useSelector,useDispatch} from "react-redux";
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
} from '@chakra-ui/react';
import { FiTrash2 } from "react-icons/fi";
import { BiSolidEdit } from "react-icons/bi";

const CreateCategory = () => {
  let dispatch=useDispatch();
  let category=useSelector(state=>state.category);
  console.log(category)
  return (
    <div className='h-auto w-full flex flex-col md:flex-row md:px-5'>
        <AdminNavigation/>
        <div className='createCategory mt-10  flex-grow flex flex-col items-center'>
          <h3 className='text-center font-bold text-xl  pb-10'>
          Add New Category
          </h3>
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-0 w-[95vw] md:w-[80%] mx-auto justify-center mb-10 '>
          <Input placeholder='Enter new category'w={{base:"full",md:"55%"}} />
          <Button colorScheme='blue'ml={2}>Add category</Button></div>
          <TableContainer w={{base:"full",md:"50vw",xl:"700px"}} pl={{sm:"30px",md:"50px"}} textAlign="center">
  <Table variant='simple'w="full">
    <TableCaption>Review before deleting any item</TableCaption>
    <Thead>
      <Tr>
        <Th>Category</Th>
        <Th visibility="hidden"display={{base:"none"}}>category</Th>
        <Th colSpan={2}>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {category.map((ele,index)=>{
        return  <Tr key={index}>
        <Td>{ele.option}</Td>
        <Td visibility="hidden"display={{base:"none"}}>hello</Td>
        <Td display="flex"gap={20}><FiTrash2 size={25}/><BiSolidEdit size={25}/></Td>
      </Tr>
      })}
    </Tbody>
  </Table>
</TableContainer>
          </div>
    </div>
  )
}

export default CreateCategory