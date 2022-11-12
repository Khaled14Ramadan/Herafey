import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    loading:false,
    error:null,
    followersarr:[],
    followingarr:[1]
   };
   export const friendsSlice = createSlice({
    name: "friends",
    initialState,
 extraReducers:{
 }
  });
  export const{}=friendsSlice.actions
  export default friendsSlice.reducer