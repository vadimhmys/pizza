import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzas', async (params) => {
  const { sortBy, order, categoryId, currentPage } = params;
  const { data } = await axios.get(
    `http://localhost:7000/api/pizza/getall?category=${categoryId}&sortBy=${sortBy}&order=${order}&limit=4&page=${currentPage}`,
  );

  return data;
});

const initialState = {
  items: [],
  count: 0,
  status: 'loading', //loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
        state.count = 0;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.rows;
        state.count = action.payload.count;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
        state.count = 0;
      });
  },
});

export const { setItems, setCount } = pizzaSlice.actions;

export default pizzaSlice.reducer;
