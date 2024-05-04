import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isLogged: { status: false },
};
let slice1 = createSlice({
  name: "test",
  initialState,
  reducers: {
    updateLogged: (state, action) => {},
    logOut: (state, action) => {},
  },
});
export let {updateLogged,logOut}=slice1.actions;
export default slice1.reducer;
