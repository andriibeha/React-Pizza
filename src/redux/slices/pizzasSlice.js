import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";

const initialState = {
    items: [],
    status: 'loading',
};

export  const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async ({sortBy, category, search, currentPage}) => {
        const { data } = await axios.get(`https://6304b2f794b8c58fd7231db1.mockapi.io/api/items?page=${currentPage}&limit=6&${category}&${search}&sortBy=${sortBy}&order=desc`)
        return data
    }
) 



export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success';
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        },
    },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;