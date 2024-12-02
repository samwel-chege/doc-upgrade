import {  configureStore } from '@reduxjs/toolkit'
import documentslice from "./slices/documentSlice";

const store = configureStore({
      reducer: { 
           document: documentslice,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }),

})

export default store;