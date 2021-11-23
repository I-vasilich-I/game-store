import { IGame, IParams } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProps {
  products: IGame[];
  topProducts: IGame[];
  filter: IParams;
}

const initialState: IProps = {
  products: [],
  topProducts: [],
  filter: {
    sortBy: "name",
    ascend: 1,
    age: 6,
    genre: null,
  },
};

export const productsSlice = createSlice({
  name: "PRODUCTS",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IGame[]>) {
      state.products = action.payload;
    },
    setTopProducts(state, action: PayloadAction<IGame[]>) {
      state.topProducts = action.payload;
    },
    setFilter(state, action: PayloadAction<IParams>) {
      const { sortBy, ascend, age, genre } = action.payload;
      state.filter.sortBy = sortBy;
      state.filter.ascend = ascend;
      state.filter.age = age;
      state.filter.genre = genre;
    },
  },
});

export const { setProducts, setTopProducts, setFilter } = productsSlice.actions;

export default productsSlice.reducer;
