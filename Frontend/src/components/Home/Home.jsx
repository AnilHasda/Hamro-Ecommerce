import React, { useEffect, useState } from "react";
import useGetData from "../getData/getdata";
const Home = () => {
  let response = useGetData();
  console.log(response.length);
  return (
    <>
      {response.length > 0 ? (
        <div className="h-auto w-full m-auto flex flex-wrap gap-2 my-5">
          {response.map((ele, index) => {
            return (
              <div
                key={ele._id}
                className="h-auto py-[20px] w-[98%] sm:w-[90%] md:w-[48%] lg:w-[300px] bg-[#f1f1f1] m-auto text-center rounded-md"
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
                 <div className="flex justify-center"> <p className="font-bold text-md">Price:</p><p>${ele.price}</p></div>
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
      )  : (
        <p>loading...</p>
      )}
    </>
  );
};

export default Home;
