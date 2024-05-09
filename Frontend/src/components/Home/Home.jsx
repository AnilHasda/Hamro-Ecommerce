import React, { useState,useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import GetData from "../getData/getdata";
import { useDispatch,useSelector } from 'react-redux'
import { Select } from "@chakra-ui/react";
import { getData } from "../../Redux/Slices/Slices";
import axios from "axios";
const Home = () => {
  let [quantity, setQunatity] = useState(1);
  let [heading,setHeading]=useState("OUR PRODUCTS");
  let response =useSelector(state=>state.responseData);
  let dispatch=useDispatch();
  let category=useSelector(state=>state.category);
  let priceSort=useSelector(state=>state.priceRange)
  //calling api to get all the data from database
  GetData();
  console.log("i am called")
    const filter=async (url,filterItem)=>{
      console.log(filterItem)
      try{
      let filterData=await axios.post(url,filterItem);
      dispatch(getData(filterData.data));
      setHeading("search result for:"+filterItem);
      }catch(error){
        console.log(error)
      }
      }
  return (
    <>
      {/* right section */}
      <div>
        <div className="h-[150px] sm:h-[100px] gap-5 sm:gap-0 sm:px-[20px] md:px-[50px] items-center w-full flex flex-col sm:flex-row justify-between">
          <div className="order-2 sm:order-1">
            <Select placeholder="Sort by Price"onChange={(e)=>{let priceValue=(e.target.value).split("-");filter("http://localhost:4000/product/filterPrice",{lowerPrice:priceValue[0],higherPrice:priceValue[1]})}}>
            {priceSort.map((ele,index)=>{
              return <option key={index} value={ele.price}>{ele.price}</option>
            })}
            </Select>
          </div>
          <h3 className="order-1 sm:order-2 font-bold text-lg text-center pt-5">{heading}</h3>
          <div className="order-3 flex gap-4">
            <Select placeholder="Sort by Category"onChange={(e)=>{filter("http://localhost:4000/product/filterCategory",{"selectCategory":e.target.value})}}>
            {category.map((ele,index)=>{
              return <option key={index} value={ele.option}>{ele.option}</option>
            })}
            </Select>
          </div>
        </div>
        {response.length > 0 ? (
          <div className="h-auto w-auto m-auto flex justify-center flex-wrap gap-4 my-5 md:px-5">
            {response.map((ele, index) => {
              return (
                <div
                  key={ele._id}
                  className="h-auto py-[20px]  w-[98%] sm:w-[40%] md:w-[30%] lg:w-[300px] bg-[#f1f1f1] shadow-md text-center rounded-md"
                >
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
              );
            })}
          </div>
        ) : (
          <div className="h-[90vh] w-full grid place-items-center">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
