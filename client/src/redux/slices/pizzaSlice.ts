import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './../store';

type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type Data = {
  rows: Pizza[];
  count: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[],
  count: number;
  status: Status;
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string; 
  categoryId: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Data, SearchPizzaParams>('pizza/fetchPizzas', async (params) => {
  const { sortBy, order, categoryId, currentPage } = params;
  const { data } = await axios.get<Data>(
    `http://localhost:7000/api/pizza/getall?categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=4&page=${currentPage}`,
  );
  
  return data;
});

const initialState: PizzaSliceState = {
  items: [],
  count: 0,
  status: Status.LOADING,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
        state.count = 0;
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Data>) => {
        state.items = action.payload.rows;
        state.count = action.payload.count;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
        state.count = 0;
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export default pizzaSlice.reducer;
