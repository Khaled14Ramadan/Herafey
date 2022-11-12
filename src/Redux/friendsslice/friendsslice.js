import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
export const fetchfollowing = createAsyncThunk(
    "users/getfollowing",
    async (val, { rejectWithValue }) => {
      try {
        const q = query(collection(db, "users"), where("uid", "in", val));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;

      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );
  export const fetchfollowers = createAsyncThunk(
    "users/getfollowers",
    async (val, { rejectWithValue }) => {
      try {
        const q = query(collection(db, "users"), where("uid", "in", val));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;

      } catch (e) {
        return rejectWithValue(e);
      }
    }
  );
const initialState = {
    loading:false,
    alreadyloaded:false,
    activetab:"followers",
    error:null,
    followersarr:[],
    followingarr:[]
   };
   export const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers:{
        toggleactivetab:(state,action)=>{
            state.activetab=action.payload
        },
        togglealready:(state,action)=>{
            state.alreadyloaded=action.payload
        }
    },
 extraReducers:{
 [fetchfollowing.pending]:(state)=>{
    state.loading=true
    console.log("pending");
 },
 [fetchfollowing.fulfilled]:(state,action)=>{
    console.log("full");
    state.loading="done"
    console.log(action.payload);
    state.followingarr=action.payload
 },
 [fetchfollowing.rejected]:(state)=>{
    state.loading=false
    console.log("rejected");
 },
 [fetchfollowers.pending]:(state)=>{
    state.loading=true

    console.log("pending");
 },
 [fetchfollowers.fulfilled]:(state,action)=>{
    console.log("full");
    state.loading="done"
    console.log(action.payload);
    state.followersarr=action.payload
 },
 [fetchfollowers.rejected]:(state)=>{
    state.loading=false

    console.log("rejected");
 },
 }
  });
  export const{toggleactivetab,togglealready}=friendsSlice.actions
  export default friendsSlice.reducer