import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { compare, comparedesc } from "../../extras/utils/sorting";
import citiesforfilter from "../../extras/cities";
import filterLoc from "../../extras/utils/locfilter";
export const fetchUsers = createAsyncThunk(
  "users/fetchNotes",
  async (val, { rejectWithValue }) => {
    try {
      if (!val.loc) {
        const q = query(collection(db, "users"), where("job", "in", val));
        const querySnapshot = await getDocs(q);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      } else {
        const q = query(collection(db, "users"), where("job", "in", val.val));
        const querySnapshot = await getDocs(q);
        const temp = filterLoc(val.loc, citiesforfilter);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        const finalData = data.filter((item) => {
          return temp.includes(item.city);
        });
        return finalData;
      }
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
const initialState = {
  isSideBarOpen: false,
  view: "grid",
  filterVal: "",
  locationVal: "",
  sortVal: "a-z",
  locerror: false,
  filteredUsers: [],
  loading: false,
  error: null,
};
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toogleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    changeview: (state, action) => {
      state.view = action.payload;
    },
    setloc: (state, action) => {
      state.locationVal = action.payload;
    },
    setfilterval: (state, action) => {
      state.filterVal = action.payload;
    },
    setlocerror: (state, action) => {
      state.locerror = action.payload;
    },
    setsort: (state, action) => {
      state.sortVal = action.payload;
      state.filteredUsers = state.filteredUsers.sort(
        action.payload == "a-z" || state.sortVal == "أ-ي"
          ? comparedesc
          : compare
      );
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {

      state.filteredUsers = action.payload.sort(
        state.sortVal == "a-z" || state.sortVal == "أ-ي" ? comparedesc : compare
      );

      state.loading = false;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export const {
  toogleSideBar,
  changeview,
  setloc,
  setfilterval,
  setlocerror,
  setsort,
} = filterSlice.actions;

export default filterSlice.reducer;
