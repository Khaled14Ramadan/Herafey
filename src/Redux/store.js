import {configureStore} from "@reduxjs/toolkit"
import languagereducer from "./Languageslice/languageslice"
import filtersreducer from "./FiltersSlice/filtersslice"
export const store = configureStore({
    reducer: {
        lang:languagereducer,
        filter:filtersreducer
    }
  })