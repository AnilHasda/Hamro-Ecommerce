import React, { useState, useEffect } from "react";
import { useContextData } from "../../addtocartContextApi/Context/createContext";
import { useSelector } from "react-redux";
import CartSummary from "./CartSummary";
import useRemoveItems from "../removeLocalStorage/RemoveItems";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
const AddCart = () => {
  // select variables
  let [totalPrice, setTotalPrice] = useState(0);
  // state for checkbox
  let [checkbox,setCheckbox]=useState([]);
  // state for handling inputs data
  let [inputs, setInputs] = useState({});
  let { cartData,removeAll,removeLocal } = useContextData();
  let isLoggin = useSelector((state) => state.isLogged.status);
  // function to handle input/quantity
  function handleChange(e) {
    setInputs((prev) => {
      let updateInput = { ...prev, [e.target.name]: e.target.value };
      return updateInput;
    });
    console.log(inputs);
  }
  // function for checkBox
  const handleCheck=(e)=>{
let {name,checked}=e.target;
if(name===selectAll){
  alert("i am don")
  let updateCheck=cartData.map(ele=>({...ele,isChecked:checked}));
  setCheckbox(updateCheck);
}
else{
let updateCheck=cartData.map((ele,index)=>ele.name+index===name?{...ele,isChecked:checked}:{...ele,isChecked:false});
setCheckbox(updateCheck);
}
console.log(checkbox);
  }
  return isLoggin ? (
    cartData?.length > 0 ? (
      <div className="flex flex-col sm:flex-row gap-5 w-full md:pl-10">
        <div className="add-cart flex flex-col gap-5 w-full sm:w-[50%] pt-10">
          <div>
            <h3 className="text-md font-bold pl-10">
              There are {cartData.length} items available in your cart!
            </h3>
          </div>
          <div className="flex items-center gap-4 ml-10">
            <div>
              <input
                type="checkbox"
                name="selectAll"
                id="selectAll"
                onChange={handleCheck}
              />
              <label htmlFor="selectAll" className="pl-1">
                Select All
              </label>
            </div>
            <Button
              colorScheme="red"
              fontSize="small"
              h={35}
              onClick={removeAll}
            >
              Remove All
            </Button>
          </div>
          {cartData.map((ele, index) => {
            return (
              <div
                key={ele.id}
                className="grid place-content-center w-full md:w-[40vw] md:block"
              >
                <Card
                  direction={{ base: "column", lg: "row" }}
                  overflow="hidden"
                  variant="outline"
                  py={5}
                  px={5}
                  textAlign={{ base: "center", md: "left" }}
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "150px", sm: "200px" }}
                    src={`http://localhost:4000/${ele.item}`}
                    alt={ele.name}
                    m={{ base: "auto", md: "0" }}
                  />

                  <Stack py={5}>
                    <CardBody>
                      <Heading fontSize="lg">{ele.name}</Heading>

                      <Text py="2" fontSize="sm">
                        {ele.description}
                      </Text>
                      <div className="flex justify-between items-center">
                        <Text
                          py="2"
                          color="rgb(242,117,64)"
                          fontWeight="semibold"
                        >
                          ${ele.price}
                        </Text>
                        <div>
                          <input
                            type="checkbox"
                            name={ele.name+index}
                            id="selectOne"
                            onChange={handleCheck}
                          />
                          <label htmlFor="selectOne" className="pl-1">
                            Select
                          </label>
                        </div>
                      </div>
                      <div>
                        <Text
                          py="2"
                          color="rgb(242,117,64)"
                          fontWeight="semibold"
                        >
                          quantity:
                          <input
                            type="number"
                            name={ele.name}
                            min={1}
                            max={10}
                            className="bg-[#c2bcbc] outline-none"
                            onChange={handleChange}
                          />
                        </Text>
                      </div>
                    </CardBody>

                    <CardFooter pb={5}>
                      <Button
                        variant="solid"
                        h={35}
                        colorScheme="blue"
                        fontSize="small"
                      >
                        Order
                      </Button>
                      <Button
                        variant="solid"
                        h={35}
                        colorScheme="red"
                        ml={5}
                        fontSize="small"
                        onClick={() => {
                          removeLocal(ele.id);
                        }}
                      >
                        Remove
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              </div>
            );
          })}
        </div>
        <CartSummary price={totalPrice} />
      </div>
    ) : (
      <p className="font-bold text-center pt-4">
        No cart data available you can add from home page.Thank You!
      </p>
    )
  ) : (
    <p className="font-bold text-center pt-4">Please login to continue</p>
  );
};

export default AddCart;
