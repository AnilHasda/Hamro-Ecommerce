import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isLogged: { status: false },
  isAdmin: { status: false },
  //this variable store the response data coming from database
  responseData: [],
  //instance of responseData for search operation
  filterResponseData: [],
  category: [],
  priceRange: [
    { price: "1-100" },
    { price: "100-200" },
    { price: "200-300" },
    { price: "300-400" },
    { price: "400-500" },
    { price: "500-600" },
    { price: "700-800" },
    { price: "800-900" },
    { price: "900-1000" },
  ],
  isLoading: { status: false },
  cartItem: { total: 0 },
};

let slice1 = createSlice({
  name: "test",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.responseData = action.payload;
    },
    filterData: (state, action) => {
      state.filterResponseData = action.payload;
    },
    updateLogged: (state, action) => {
      state.isLogged.status = action.payload.isLogged;
      state.isAdmin.status = action.payload.isAdmin;
    },
    loadingStatus: (state, action) => {
      state.isLoading.status = action.payload;
    },
    logOut: (state, action) => {
      state.isLogged.status = action.payload.isLogged;
      state.isAdmin.status = action.payload.isAdmin;
    },
    updateCart: (state, action) => {
      state.cartItem.total += action.payload;
    },
    updateCategory: (state, action) => {
      state.category = [...state.category, { option: action.payload }];
    },
    addCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export let {
  getData,
  updateLogged,
  loadingStatus,
  updateCart,
  filterData,
  addCategory,
  logOut
} = slice1.actions;
export default slice1.reducer;
