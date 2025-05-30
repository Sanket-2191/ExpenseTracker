import { configureStore } from "@reduxjs/toolkit";


import { transactionReducer } from "./transactionSlice.js";
import { authReducer } from "./authSlice.js";



export const store = configureStore({
    reducer: {
        transactions: transactionReducer,
        authReducer
    }
})