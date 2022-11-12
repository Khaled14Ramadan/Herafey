import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { doc,updateDoc,arrayUnion , arrayRemove } from "firebase/firestore";
export const addtoFollow = createAsyncThunk(
   "user/follow",
      async (val,{rejectWithValue}) => {
         try{

         const follow = doc(db, "users",val.userid);
         const following=doc(db, "users",val.toadd);
   await updateDoc(follow,{
      following:arrayUnion(val.toadd)
   })
   await updateDoc(following,{
      followers:arrayUnion(val.userid)
   })
      }
      catch(e){
         return rejectWithValue(e)
      }
   } 
 
 );

 export const removeFormFollow = createAsyncThunk(
   "user/unfollow",
      async (val,{rejectWithValue}) => {
         try{

         const follow = doc(db, "users",val.userid);
         const following=doc(db, "users",val.toadd);
   await updateDoc(follow,{
      following:arrayRemove(val.toadd)
   })
   await updateDoc(following,{
      followers:arrayRemove(val.userid)
   })
      }
      catch(e){
         return rejectWithValue(e)
      }
   } 
 
 );
const initialState = {
   errmsg:""
  };
  export const followSlice = createSlice({
    name: "follow",
    initialState,
 extraReducers:{
[addtoFollow.pending]:(state,action)=>{
   console.log(action.payload);
   console.log("pending");
},
[addtoFollow.fulfilled]:(state,action)=>{
   console.log("fill");
},
[addtoFollow.rejected]:(state,action)=>{
   state.errmsg="there was an error while follow"
   console.log("error");
}
 }
  });
  export const {
  
  } = followSlice.actions;
  export default followSlice.reducer;
