export type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export type Data = {
  rows: Pizza[];
  count: number;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
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