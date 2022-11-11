import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { db } from '../../firebase'
import { collection, getDocs,where,query } from "firebase/firestore"; 
import { compare,comparedesc } from '../../extras/utils/sorting';
export const fetchUsers = createAsyncThunk("users/fetchNotes", async (val) => {
  if(!val.loc){
    const q = query(collection(db, "users"), where("job", "==", val));
    const querySnapshot = await getDocs(q);
    const data=[]
  querySnapshot.forEach((doc) => {
  data.push(doc.data())
  });
  return data
  } 
  else{
    const q = query(collection(db, "users"), where("job", "==", val.val),where("city","==",val.loc));
    const querySnapshot = await getDocs(q);
    const data=[]
  querySnapshot.forEach((doc) => {
  data.push(doc.data())
  });
  return data
  }

});
const initialState={
    isSideBarOpen:false,
    view:"grid",
    filterVal:localStorage.getItem("filterval")||"",
    locationVal:"",
    sortVal:"a-z",
    locerror:false,
    filteredUsers:[],
    loading:false,
    error:null
}
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
  reducers:{
toogleSideBar:(state)=>{
state.isSideBarOpen=!state.isSideBarOpen
},
changeview:(state,action)=>{
    state.view=action.payload
},
setloc:(state,action)=>{
  state.locationVal=action.payload
},
setfilterval:(state,action)=>{
  state.filterVal=action.payload
},
setlocerror:(state,action)=>{
state.locerror=action.payload
},
setsort:(state,action)=>{
  state.sortVal=action.payload
  state.filteredUsers=state.filteredUsers.sort(action.payload=="a-z"?comparedesc:compare)
}
  },
  extraReducers:{
    [fetchUsers.pending]: (state, action) => {
      console.log("pending");
   state.loading=true
       },
       [fetchUsers.fulfilled]: (state, action) => {
           console.log("fullfilled")
           if(state.sortVal=="a-z"){
            state.filteredUsers=action.payload.sort(comparedesc)
           }
           if(state.sortVal=="z-a"){
            state.filteredUsers=action.payload.sort(compare)
           }
          state.loading=false
   
         
   
       },
       [fetchUsers.rejected]: (state, action) => {
     state.loading=false
     state.error=true
   
   
       }
  }
  })
  export const {toogleSideBar,changeview,setloc,setfilterval,setlocerror,setsort} = filterSlice.actions

export default filterSlice.reducer