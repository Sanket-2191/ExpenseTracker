import { meta } from "@eslint/js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const domain = import.meta.env.VITE_API_URL;
const API_URL = `${domain}/users`


export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${API_URL}/register`, // Adjust if your route differs
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true, // important for cookie-based tokens
                }
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${API_URL}/login`, // Adjust if needed
                credentials,
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);


export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${API_URL}/logout`,
                {},
                { withCredentials: true }
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Logout failed"
            );
        }
    }
);



const INITIAL_STATE = { loggedIn: true, user: null, loading: false, error: null };

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        logout: (state) => {
            state.loggedIn = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.loggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.loggedIn = false;
                state.user = null;
                state.loading = false;
            });
    }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer;