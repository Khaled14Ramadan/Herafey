import { createSlice } from '@reduxjs/toolkit'
const initialState={
    lang:localStorage.getItem("language")||navigator.language.split("-")[0]
}

 const languageSlice = createSlice({
    name: 'lang',
    initialState,
  reducers:{
changeLang:(state)=>{
    state.lang==="en"?state.lang="ar":state.lang="en";
    localStorage.setItem("language",`${state.lang}`);
}
  }
  })

export const {changeLang} = languageSlice.actions

export default languageSlice.reducer