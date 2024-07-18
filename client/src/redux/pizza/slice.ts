import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Data, PizzaSliceState, Status } from './types';
import { fetchPizzas } from './asyncActions';

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

export default pizzaSlice.reducer;
