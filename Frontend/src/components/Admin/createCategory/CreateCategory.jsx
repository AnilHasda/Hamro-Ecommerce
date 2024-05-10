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
          <h3 className='text-center font-bold text-xl text-red-700 pb-10'>
          Add New Category
          </h3>
          <div className='flex w-[80%] mx-auto justify-center'>
          <Input placeholder='Enter new category'w={{md:"50%"}} />
          <Button colorScheme='blue'ml={2}>Add category</Button></div>
          <TableContainer w={{sm:"full",md:"50vw"}} bg-red pl={{sm:"30px",md:"50px"}}>
  <Table variant='simple'>
    <TableCaption>Review before deleting any item</TableCaption>
    <Thead>
      <Tr>
        <Th>Category</Th>
        <Th visibility="hidden">category</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>
    <Tbody>
      {category.map((ele,index)=>{
        return  <Tr key={index}>
        <Td>{ele.option}</Td>
        <Td visibility="hidden">hello</Td>
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