import React from "react";
import { useContextData } from "../../addtocartContextApi/Context/createContext";
import { useSelector } from "react-redux";
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
  let { cartData } = useContextData();
  let isLoggin = useSelector((state) => state.isLogged.status);
  console.log(isLoggin);
  return isLoggin ? (
    cartData.length > 0 ? (
      <div className="flex gap-5 w-full">
         <div className="flex flex-col gap-5 w-full sm:w-[50%]">
        {cartData.map((ele) => {
          return (
            <div key={ele.id}className="grid place-content-center md:block">
                <Card
                  direction={{ base: "column", sm: "row" }}
                  overflow="hidden"
                  variant="outline"
                  py={5}
                  px={5}
                  border="none"

                  textAlign={{ base: "center", md: "left" }}
                >
                  <Image
                    objectFit="cover"
                    maxW={{ base: "200px", sm: "200px" }}
                    src={`http://localhost:4000/${ele.item}`}
                    alt={ele.name}
                    m={{ base: "auto", md: "0" }}
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md">{ele.name}</Heading>

                      <Text py="2">{ele.description}</Text>
                      <Text py="2">${ele.price}</Text>
                    </CardBody>

                    <CardFooter>
                      <Button variant="solid" colorScheme="blue">
                        Order
                      </Button>
                      <Button variant="solid" colorScheme="red" ml={5}>
                        Check out
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              </div>
          );
        })}
          </div>
        <div>hello this is anil hasda</div>
      </div>
    ) : (
      <p className="font-bold text-center pt-4">
        No cart data available you can add from home page.Thank You!
      </p>
    )
  ) : (
    <p className="font-bold text-center pt-4">Please login to continue</p>
  );
return(
    <>this is home page</>
)
};

export default AddCart;
