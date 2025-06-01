import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const domain = import.meta.env.VITE_API_URL;
const API_URL = `${domain}/transactions`


// Fetch all transactions
export const fetchTransactions = createAsyncThunk(
    "transactions/fetchAll",
    async (_, thunkAPI) => {
        try {
            const res = await axios.get(API_URL, {
                withCredentials: true,
            });
            return res.data.data; // return array of transactions
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// create transaction 
export const createTransaction = createAsyncThunk(
    "transactions/create",
    async ({ amount, type, category, date, note }, thunkAPI) => {
        try {
            const res = await axios.post(
                API_URL,
                { amount, type, category, date, note }, // match server expectation
                {
                    withCredentials: true,
                }
            );
            return res.data.data;
        } catch (error) {
            console.log("error while creating transaction: ", error);
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


// Update a transaction by id
export const updateTransaction = createAsyncThunk(
    "transactions/update",
    async ({ id, amount, type, category, date, description }, thunkAPI) => {
        try {
            const res = await axios.patch(
                `${API_URL}/${id}`,
                { amount, type, category, date, description },
                {
                    withCredentials: true,
                }
            );
            return res.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
// Delete a transaction by id
export const deleteTransaction = createAsyncThunk(
    "transactions/delete",
    async (id, thunkAPI) => {
        try {
            const token = getToken();
            await axios.delete(`${API_URL}/${id}`, {
                withCredentials: true,
            });
            return id; // return deleted id for reducer to remove
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const transactionSlice = createSlice({
    name: "transactions",
    initialState: {
        transactions: [],
        loading: false,
        error: null,
        editing: { id: "", status: false },
        toUpdate: null,
    },
    reducers: {
        setEditing: (state, action) => {
            state.editing = action.payload; // { id, status }
        },
        resetEditing: (state) => {
            state.editing = { id: "", status: false };
            state.toUpdate = null;
        },
        setToUpdate: (state, action) => {
            state.toUpdate = action.payload; // full expense object
        },
    },
    extraReducers: (builder) => {
        builder

            // fetchTransactions
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // createTransaction
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loading = false;
                // Add new transaction at start (like in your reducer)
                state.transactions.unshift(action.payload);
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // updateTransaction
            .addCase(updateTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                const index = state.transactions.findIndex((t) => t.id === updated.id);
                if (index !== -1) {
                    state.transactions[index] = updated;
                }
            })
            .addCase(updateTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // deleteTransaction
            .addCase(deleteTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.payload;
                state.transactions = state.transactions.filter((t) => t.id !== id);
            })
            .addCase(deleteTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setEditing,
    resetEditing,
    setToUpdate,
} = transactionSlice.actions;

export const transactionSelector = (state) => state.transactions;

export const transactionReducer = transactionSlice.reducer;
