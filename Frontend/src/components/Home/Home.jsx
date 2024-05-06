import React, { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import useGetData from "../getData/getdata";
const Home = () => {
  let [quantity, setQunatity] = useState(1);
  let response = useGetData();
  console.log(response.length);
  return (
    <>
      {response.length > 0 ? (
        <div className="h-auto m-auto flex flex-wrap gap-4 my-5 xl:pl-[50px]">
          {response.map((ele, index) => {
            return (
              <div
                key={ele._id}
                className="h-auto py-[20px] w-[98%] md:w-[30%] lg:w-[300px] bg-[#f1f1f1] text-center rounded-md"
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
                  {/* <div>
    <p>Description:</p>
      <p>{ele.description}</p>
    </div> */}
                  <div className="flex justify-center">
                    {" "}
                    <p className="font-bold text-md">Price:</p>
                    <p>${ele.price}</p>
                  </div>
                  <label htmlFor="quantity" className="font-bold text-md">
                    Quantity
                  </label>
                  <br />
                  <input
                    type="number"
                    min={1}
                    max={100}
                    className="h-[40px] w-[50px] outline-none bg-[white] text-center"
                    value={quantity}
                  />
                  <br />
                  <button className="px-3 py-[5px] bg-blue-600 text-white rounded-md mt-[15px]">
                    See detail
                  </button>
                  <button className="px-3 py-[5px] bg-red-600 text-white ml-4 rounded-md mt-[15px]">
                    Add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-[90vh] w-full grid place-items-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Home;
