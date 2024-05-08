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
  ]
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
  },
});
export let {getData,updateLogged,logOut}=slice1.actions;
export default slice1.reducer;
