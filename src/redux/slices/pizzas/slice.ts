import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
import { Pizza, Status } from './type';



interface PizzaScliceState {
    items: Pizza[];
    status: Status;
};

const initialState: PizzaScliceState = {
    items: [],
    status: Status.LOADING,
};

export type SearchPizzaParams = {
    sortBy: string;
    category: string;
    search: string;
    currentPage: string;
};

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus',
    async ({ sortBy, category, search, currentPage }: SearchPizzaParams) => {
        const { data } = await axios.get<Pizza[]>(`https://6304b2f794b8c58fd7231db1.mockapi.io/api/items?page=${currentPage}&limit=6&${category}&${search}&sortBy=${sortBy}&order=desc`)
        return data as Pizza[];
    }
);


export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => { 
    builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
    })
    
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
    })
    
    builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    }
});



export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;