import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Data, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Data, SearchPizzaParams>('pizza/fetchPizzas', async (params) => {
  const { sortBy, order, categoryId, currentPage } = params;
  const { data } = await axios.get<Data>(
    `http://localhost:7000/api/pizza/getall?categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&limit=4&page=${currentPage}`,
  );
  
  return data;
});