import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isLogged: { status: false },
  isAdmin:{status:false}
};
let slice1 = createSlice({
  name: "test",
  initialState,
  reducers: {
    updateLogged: (state, action) => {
      console.log("i am clicked")
      state.isLogged.status=action.payload.isLogged;
      state.isAdmin.status=action.payload.isAdmin;
    },
    logOut: (state, action) => {
      state.isLogged.status=false;
      state.isAdmin.status=false;
    },
  },
});
export let {updateLogged,logOut}=slice1.actions;
export default slice1.reducer;
