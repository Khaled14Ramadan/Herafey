import { createSlice } from '@reduxjs/toolkit'
const initialState={
    isSideBarOpen:false,
    view:"grid",
    filterVal:localStorage.getItem("filterval")||"",
    locationVal:"",
    sortVal:"",
    FilteredJob:"",
    loading:"",
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
state.filterVal=action.payload
},
setfilterval:(state,action)=>{
  state.filterVal=action.payload
}
  }
  })
  export const {toogleSideBar,changeview,setloc,setfilterval} = filterSlice.actions

export default filterSlice.reducer