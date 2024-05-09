import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isLogged: { status: false },
  isAdmin:{status:false},
  responseData:[],
  category:[
    {"option":"watch"},
    {"option":"shoes"},
    {"option":"clothes"},
    {"option":"mobiles"},
    {"option":"others"},
  ],
  priceRange:[
    {"price":"1-100"},
    {"price":"100-200"},
    {"price":"200-300"},
    {"price":"300-400"},
    {"price":"400-500"},
    {"price":"500-600"},
    {"price":"700-800"},
    {"price":"800-900"},
    {"price":"900-1000"},
  ],
  isLoading:{status:false},
  cartItem:{total:0}
};

let slice1 = createSlice({
  name: "test",
  initialState,
  reducers: {
    getData:(state,action)=>{
state.responseData=action.payload;
    },
    updateLogged: (state, action) => {
      state.isLogged.status=action.payload.isLogged;
      state.isAdmin.status=action.payload.isAdmin;
    },
    logOut: (state, action) => {
      state.isLogged.status=false;
      state.isAdmin.status=false;
    },
    loadingStatus:(state,action)=>{
      state.isLoading.status=action.payload;
    },
    updateCart:(state,action)=>{
      state.cartItem.total+=action.payload;
    }
  },
});
export let {getData,updateLogged,logOut,loadingStatus,updateCart}=slice1.actions;
export default slice1.reducer;
