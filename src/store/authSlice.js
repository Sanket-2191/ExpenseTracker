import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const domain = import.meta.env.VITE_API_URL;
const API_URL = `${domain}/users`


export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                `${API_URL}/signup`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );
            toast.success("Registration successful!");
            return res.data;
        } catch (error) {
            const message = error.response?.data?.message || "Registration failed";
            toast.error("Registration failed");
            return rejectWithValue(message);
        }
    }
);


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/login`, credentials, {
                withCredentials: true,
            });
            toast.success("Login successful!");
            return res.data;
        } catch (error) {
            const message = error.response?.data?.message || "Login failed";

            toast.error("Login failed");
            return rejectWithValue(message);
        }
    }
);


export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            // console.log("trying to logout.");

            const res = await axios.get(
                `${API_URL}/logout`,
                {
                    withCredentials: true
                }
            );
            toast.success("Logout successful!");
            persistor.purge();
            return res.data;
        } catch (error) {
            const message = error.response?.data?.message || "Logout failed";
            console.log("logout error: ", message);
            // toast.error("Logout failed");
            return rejectWithValue(message);
        }
    }
);



const INITIAL_STATE = { loggedIn: false, user: null, loading: false, error: null };

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
            })
        // .addCase(logoutUser.rejected, (state) => {
        //     state.loggedIn = false;
        //     state.user = state.user;
        //     state.loading = false;
        // });
    }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer;