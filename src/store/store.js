import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { combineReducers } from "redux";

import { transactionReducer } from "./transactionSlice.js";
import { authReducer } from "./authSlice.js";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authReducer", "transactions"], // which state to persist
};

const rootReducer = combineReducers({
    transactions: transactionReducer,
    authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // required for redux-persist to work properly
        }),
});

export const persistor = persistStore(store);
