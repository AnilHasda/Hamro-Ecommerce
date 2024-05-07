import React, { useState,useEffect } from "react";
import axios from "axios";
import useGetData from "../../getData/getdata";
import AdminNavigation from "../../adminNavigation/AdminNavigation";
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
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
} from "@chakra-ui/react";
const ShowAllData = () => {
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [image, setImage] = useState(null);
  let [previewImage,setPreviewImage]=useState("");
  let [category,setCategory]=useState("");
  let [dummy,setDummy]=useState(false);
  let [id,setId]=useState("");
  let [x,setX]=useState(0)
let response=useGetData();
  console.log({dummy,x});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handleModal = (ele) => {
    setName(ele.name);
    setDescription(ele.description);
    setPrice(ele.price);
    setId(ele._id);
    setPreviewImage(ele.item);
    setCategory(ele.category);
    onOpen();
  };
  //delete function
  async function deleteData(id){
    try{
let responseData=await axios.delete("http://localhost:4000/product/deleteData/"+id);
if(responseData){
  toast.success(responseData.data.message);
}
    }catch(error){
toast.error(error.responseData.data.message);
    }
  }
  //update function 
  async function updateData(e){
    e.preventDefault();
    let formData=new FormData();
    formData.append("image",image);
    formData.append("name",name);
    formData.append("category",category);
    formData.append("description",description);
    formData.append("price",price);
    try{
    let responseData=await axios.put("http://localhost:4000/product/updateData/"+id,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(responseData){
      toast.success(responseData.data.message);
      onClose();
    }else{
      toast.error("something went wrong");
    }
  }catch(error){
    toast.error("error");
    console.log(error)
  }
  }
  return (
    <div className="h-auto w-full flex flex-col md:flex-row lg:gap-[50px] pb-10 md:px-[20px] ">
      <AdminNavigation />
      <div className="h-auto w-full flex flex-wrap gap-5 mt-10">
         {/*  update modal starts from here*/}
         <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                  <form encType="multipart/form-data"onSubmit={updateData}>
                    <ModalHeader>Update product items</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      
                      <FormControl>
                        <FormLabel>Name:</FormLabel>
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>image:</FormLabel>
                        <Input
                        className="border-none"
                          type="file"
                          name="image-file"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                        <img src={!image?`http://localhost:4000/${previewImage}`:URL.createObjectURL(image)} alt={name} className="w-full"/>
                      </FormControl>

                      <FormControl mt={4}>
                        <FormLabel>Description:</FormLabel>
                        <Textarea
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          className="resize-none"
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Price:</FormLabel>
                        <Input
                          type="number"
                          value={price}
                          onChange={(e) => {
                            setPrice(e.target.value);
                          }}
                        />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button type="submit" colorScheme="blue" mr={3}>
                        Update
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                    </form>
                  </ModalContent>
                </Modal>

                {/* update modal end here */}
        {response.map((ele) => {
          return (
            <div
              key={ele._id}
              className="h-[370px] shadow-md pb-5 py-[20px] w-[98%] md:w-[30%] m-auto md:m-0 lg:w-[300px] bg-[#f1f1f1] text-center rounded-md"
            >
              <img
                src={`http://localhost:4000/${ele.item}`}
                alt={ele.name}
                className="w-full mb-4"
              />
              <div>
                <div className="text-center border-t-2 py-1">
                  <p>{ele.name}</p>
                  <p className="text-sm py-2">{ele.description.length>20 ? ele.description.substring(0,30)+"...":ele.description}</p>
                  <p className="text-[#ff5900be] pb-2">${ele.price}</p>
                </div>
                <button
                  className="h-[35px] w-[80px] bg-blue-600 text-white rounded-md text-sm"
                  onClick={() => {
                    handleModal(ele);
                    setImage(null)
                  }}
                >
                  Edit
                </button>
               
                <button className="h-[35px] w-[80px] bg-red-600 text-white text-sm ml-4 rounded-md"onClick={()=>{deleteData(ele._id)}}>
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
