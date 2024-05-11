import React, { useState,useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import GetData from "../getData/getdata";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "@chakra-ui/react";
import { getData, loadingStatus,updateCart } from "../../Redux/Slices/Slices";
import axios from "axios";
const Home = () => {
  let [quantity, setQunatity] = useState(1);
  let [heading, setHeading] = useState("OUR PRODUCTS");
  let [pageNumber, setPageNumber] = useState(1);
  let [selectPrice,setSelectPrice]=useState("");
  let [selectCategory,setSelectCategory]=useState("");
  let response = useSelector((state) => state.responseData);
  console.log(response);
  let dispatch = useDispatch();
  let isLoading = useSelector((state) => state.isLoading.status);
  let category = useSelector((state) => state.category);
  let priceSort = useSelector((state) => state.priceRange);
  let maxNumber = 8;
  GetData();
  //calling api to get all the data from database
  const filter = async (filterItem) => {
    try {
      dispatch(loadingStatus(true));
      let filterData = await axios.post(
        "http://localhost:4000/product/filterCategory",
        filterItem
      );
      dispatch(getData(filterData.data));
      if((!selectPrice && selectCategory) || (selectCategory && selectPrice)){
      setHeading("search result for:"+selectCategory);
      }else{
        setHeading("search range for:"+selectPrice[0]+"-"+selectPrice[1]);
        console.log(selectPrice)
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loadingStatus(false));
    }
  };
useEffect(()=>{
if(selectPrice !== "" || selectCategory !==""){
  filter({selectPrice,selectCategory});
}
},[selectPrice,selectCategory])
  return (
    <>
      {/* right section */}
      <div>
        <div className="h-[150px] sm:h-[100px] gap-5 sm:gap-0 sm:px-[20px] md:px-[50px] items-center w-full flex flex-col sm:flex-row justify-between">
          <div className="order-2 sm:order-1">
            <Select
              placeholder="Sort by Price"
              onChange={(e) => {
                let priceValue = e.target.value.split("-");
                setSelectPrice(priceValue);
              }}
            >
              {priceSort.map((ele, index) => {
                return (
                  <option key={index} value={ele.price}>
                    {ele.price}
                  </option>
                );
              })}
            </Select>
          </div>
          <h3 className="order-1 sm:order-2 font-bold text-lg text-center pt-5">
            {heading}
          </h3>
          <div className="order-3 flex gap-4">
            <Select
              placeholder="Sort by Category"
              onChange={(e) => {
               setSelectCategory(e.target.value);
              }}
            >
              {category.map((ele, index) => {
                return (
                  <option key={index} value={ele.option}>
                    {ele.option}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
        {response.length > 0 ? (
          <div className="h-auto w-auto m-auto flex justify-center flex-wrap gap-4 my-5 md:px-5">
            {response.length > 8 ?
              response

                .slice(
                  pageNumber * maxNumber - maxNumber,
                  pageNumber * maxNumber
                )
                .map((ele, index) => {
                  return (
                    <div key={ele._id}>
                      <div className="h-auto py-[20px] w-[98vw] sm:w-[250px] lg:w-[300px] bg-[#f1f1f1] shadow-md text-center rounded-md">
                        <img
                          src={`http://localhost:4000/${ele.item}`}
                          alt={ele.name}
                          className="h-[150px] m-auto mb-4"
                        />
                        <div className="border-t-2">
                          <div className="flex justify-center mt-3">
                            <p>{ele.name}</p>
                          </div>
                          <div className="text-sm mb-4 mt-2">
                            <p>
                              {ele.description.length > 20
                                ? ele.description.substring(0, 20) + "..."
                                : ele.description}
                            </p>
                          </div>
                          <div className="flex justify-center gap-5">
                            <input
                              type="number"
                              min={1}
                              max={100}
                              value={quantity}
                              onChange={(e) => {
                                setQunatity(e.target.value);
                              }}
                              className=" outline-none text-black text-center"
                            />
                            <br />
                            <div className="flex justify-center text-[#ff5900be] text-md">
                              <p>${ele.price}</p>
                            </div>
                            <br />
                          </div>
                          <button className="px-3 py-[5px] text-sm bg-blue-600 text-white rounded-md mt-[15px]">
                            See detail
                          </button>
                          <button className="px-3 py-[5px] text-sm bg-red-600 text-white ml-4 rounded-md mt-[15px]"onClick={()=>{dispatch(updateCart(1))}}>
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
                // padingation false condition 
              :response.map((ele,index)=>{
                return <div key={ele._id}>
                <div className="h-auto py-[20px]  w-[98%] sm:w-[40%] md:w-[30%] lg:w-[300px] bg-[#f1f1f1] shadow-md text-center rounded-md">
                  <img
                    src={`http://localhost:4000/${ele.item}`}
                    alt={ele.name}
                    className="h-[150px] m-auto mb-4"
                  />
                  <div className="border-t-2">
                    <div className="flex justify-center mt-3">
                      <p>{ele.name}</p>
                    </div>
                    <div className="text-sm mb-4 mt-2">
                      <p>
                        {ele.description.length > 20
                          ? ele.description.substring(0, 20) + "..."
                          : ele.description}
                      </p>
                    </div>
                    <div className="flex justify-center gap-5">
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={quantity}
                        onChange={(e) => {
                          setQunatity(e.target.value);
                        }}
                        className=" outline-none text-black text-center"
                      />
                      <br />
                      <div className="flex justify-center text-[#ff5900be] text-md">
                        <p>${ele.price}</p>
                      </div>
                      <br />
                    </div>
                    <button className="px-3 py-[5px] text-sm bg-blue-600 text-white rounded-md mt-[15px]">
                      See detail
                    </button>
                    <button className="px-3 py-[5px] text-sm bg-red-600 text-white ml-4 rounded-md mt-[15px]">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
                
                
              })
              }
          
                </div>
        ) : (
          <div className="h-[90vh] w-full grid place-items-center">
            {isLoading ? <Spinner /> : <p>No such data found</p>}
          </div>
        )}
      </div>
      {response.length > maxNumber && (
        <div className="h-auto py-5 w-[80vw] m-auto flex gap-5">
          {pageNumber > 1 && (
            <button
              className="h-10 w-[80px] bg-[#edebeb] shadow-md"
              onClick={() => {
                setPageNumber((prev) => prev - 1);
              }}
            >
              prev
            </button>
          )}
          {[...Array(Math.ceil(response.length / maxNumber))].map(
            (_, index) => {
              return (
                <button
                  key={index}
                  className={`h-10 w-[80px] shadow-md ${pageNumber===index+1 ? "bg-[#d4cfcf]" : "bg-[#edebeb]"}`}
                  onClick={() => {
                    setPageNumber(index + 1);
                  }}
                >
                  {index + 1}
                </button>
              );
            }
          )}
          {pageNumber < Math.ceil(response.length / maxNumber) && (
            <button
              className="h-10 w-[80px] bg-[#edebeb] shadow-md rounded-md"
              onClick={() => {
                setPageNumber((prev) => prev + 1);
              }}
            >
              next
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
