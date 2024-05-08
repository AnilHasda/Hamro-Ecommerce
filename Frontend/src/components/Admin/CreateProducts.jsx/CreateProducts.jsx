import React, { useState, useRef } from "react";
import axios from "axios";
import Toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
const CreateProducts = () => {
  let [image, setImage] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState("");
  let [previewImage, setPreviewImage] = useState("");
  let [category, setCategory] = useState("");
  let [name, setName] = useState("");
  let file = useRef(null);
  let categoryOptions=useSelector(state=>state.category);
  let adminStatus = useSelector((state) => state.isAdmin.status);
  adminStatus = true;
  //function of previewImage
  const showPreview = (e) => {
    let file = e.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
  };
  //funtion for sending data to the backend
  async function sentData(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("image", image);
    formdata.append("name", name);
    formdata.append("category", category);
    formdata.append("description", description);
    formdata.append("price", price);
    console.log(image);
    try {
      var response = await axios.post(
        "http://localhost:4000/product/insertData",
        formdata,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Toast.success(response.data.message);
      file.current.value = "";
      setDescription("");
      setPrice("");
      setImage("");
      setCategory("");
      setName("");
    } catch (error) {
      Toast.error(
        error.response.data?.message || "only image files are allowed"
      );
    }
  }
  return (
    <>
      {adminStatus === true ? (
        <div className="createProducts md:w-[60vw]  text-black  py-10">
          <form
            className="w-[90%] md:w-[400px] lg:w-[600px] m-auto"
            onSubmit={sentData}
            encType="multipart/form-data"
          >
            <div className=" text-xl mb-8 font-semibold">
              <h3>Add product-items</h3>
            </div>
            <input
              type="file"
              name="product-item"
              ref={file}
              accept="image/jpeg,image/png,image/jpg,image/webp"
              className="h-[35px] w-full  m-auto rounded-sm mb-4 mt-[5px] border-none outline-none text-black "
              onChange={(e) => {
                setImage(e.target.files[0]);
                showPreview(e);
              }}
              required
            />
            <br />
            {image && (
              <>
                <label>Preview of image:</label>
                <img
                  src={previewImage}
                  alt="preview-image"
                  className="h-[200px] my-[10px]"
                />
              </>
            )}
            <label htmlFor="item">Item</label>
            <input
              type="text"
              placeholder="enter name of item...."
              id="item"
              className="h-[40px] border border-[#c9c1c1] pl-5 w-full m-auto rounded-md mb-4 mt-[5px] outline-none text-black placeholder:text-sm placeholder:text-gray-700"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              autoComplete="off"
              required
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <select
              id="category"
              placeholder="select category"
              className="h-10 border border-[#c9c1c1] w-full rounded-md text-black mb-5 outline-none"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categoryOptions.map((ele,index)=>{
                return <option key={index} value={ele.option}>{ele.option}</option>
              })}
            </select>
            <br />
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <br />
            <textarea
              placeholder="Write short description...."
              id="description"
              className=" pl-5 border border-[#c9c1c1] pt-1 w-full m-auto rounded-md mb-4 mt-[5px]  outline-none text-black resize-none placeholder:text-sm placeholder:text-gray-700"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              rows={5}
              autoComplete="off"
              required
            />
            <br />
            <label htmlFor="price" className="font-semibold">
              Price:
            </label>
            <br />
            <input
              type="number"
              placeholder="enter price of item...."
              id="price"
              min={0}
              className="h-[40px] border border-[#c9c1c1] pl-5 w-full m-auto rounded-md mb-4 mt-[5px]  outline-none text-black placeholder:text-sm placeholder:text-gray-700"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
              autoComplete="off"
              required
            />
            <br />
            <button
              type="submit"
              name="submit"
              className="h-[35px] w-full  mt-5 bg-[#ff7441] text-white  rounded-sm hover:bg-[rgb(255,129,66)] transition duration-200"
            >
              submit
            </button>
          </form>
        </div>
      ) : (
        <p>warning:only admin can access this</p>
      )}
    </>
  );
};

export default CreateProducts;
