import {configureStore} from "@reduxjs/toolkit"
import languagereducer from "./Languageslice/languageslice"
export const store = configureStore({
    reducer: {
        lang:languagereducer
    }
  })