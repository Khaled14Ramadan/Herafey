import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion, collection, getDocs, where, query, limit } from "firebase/firestore";
export const addtoFollow = createAsyncThunk(
   "user/follow",
   async (val, { rejectWithValue }) => {
      try {

         const follow = doc(db, "users", val.userid);
         const following = doc(db, "users", val.toadd);
         await updateDoc(follow, {
            following: arrayUnion(val.toadd)
         })
         await updateDoc(following, {
            followers: arrayUnion(val.userid)
         })
      }
      catch (e) {
         return rejectWithValue(e)
      }
   }

);
export const newusers = createAsyncThunk("user/getusers",
   async () => {
      try {
         const q = query(collection(db, "users"), limit(3));
         const querysnapshot = await getDocs(q)
         const data = []
         querysnapshot.forEach((doc) => {
            data.push(doc.data());
         });
         return data;
      } catch (error) {
         console.log(error);
      }
   }
)
const initialState = {
   errmsg: "",
   users: []
};
export const followSlice = createSlice({
   name: "follow",
   initialState,
   extraReducers: {
      [addtoFollow.pending]: (state, action) => {
         console.log(action.payload);
         console.log("pending");
      },
      [addtoFollow.fulfilled]: (state, action) => {
         console.log("fill");
      },
      [addtoFollow.rejected]: (state, action) => {
         state.errmsg = "there was an error while follow"
         console.log("error");
      },
      [newusers.pending]: (state, action) => {
         console.log("pending");
      },
      [newusers.fulfilled]: (state, action) => {
         console.log("succss");
         state.users = action.payload
      },
      [newusers.rejected]: (state, action) => {
         console.log("error from follow slice");
      }
   }
});
export const {

} = followSlice.actions;
export default followSlice.reducer;