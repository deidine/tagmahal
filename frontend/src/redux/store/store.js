import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice.js";
import authReducer from "../slices/authSlice.js";


export const store = configureStore({
  reducer: {
    
    products: productReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  //* NOTE:- In short, using `getDefaultMiddleware({ serializableCheck: false })` allows you to disable the default Redux Toolkit middleware responsible for checking the serializability of Redux state and actions. This can improve performance, especially with large or complex data structures, and gives you more control over your Redux middleware setup.
});
