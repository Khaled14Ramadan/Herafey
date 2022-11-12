import {configureStore} from "@reduxjs/toolkit"
import languagereducer from "./Languageslice/languageslice"
import filtersreducer from "./FiltersSlice/filtersslice"
import followreducer from "./followslice/followslice"
import friendsreducer from "./friendsslice/friendsslice"
export const store = configureStore({
    reducer: {
        lang:languagereducer,
        filter:filtersreducer,
        follow:followreducer,
        friends:friendsreducer
        
    }
  })