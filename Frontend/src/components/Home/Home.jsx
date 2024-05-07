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
                className="h-auto py-[20px] w-[98%] md:w-[30%] lg:w-[300px] bg-[#f1f1f1] shadow-md text-center rounded-md"
              >
                <img
                  src={`http://localhost:4000/${ele.item}`}
                  alt={ele.name}
                  className="w-full mb-4"
                />
                <div className="border-t-2">
                  <div className="flex justify-center mt-3">
                    <p>{ele.name}</p>
                  </div>
                  <div className="text-sm my-4">
                    <p>{ele.description.length>20 ? ele.description.substring(0,20)+"...":ele.description}</p>
                  </div>
                  <div className="flex justify-center gap-5">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    className=" outline-none text-black text-center"
                    value={quantity}
                    
                  />
                  <br />
                  <div className="flex justify-center text-[#ff5900be] text-md">
                    <p>${ele.price}</p>
                  </div><br/>
                  </div>
                  <button className="px-3 py-[5px] text-sm bg-blue-600 text-white rounded-md mt-[15px]">
                    See detail
                  </button>
                  <button className="px-3 py-[5px] text-sm bg-red-600 text-white ml-4 rounded-md mt-[15px]">
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
