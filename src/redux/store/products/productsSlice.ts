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
    age: 0,
    genre: 1,
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
    setAge(state, action: PayloadAction<number>) {
      state.filter.age = action.payload;
    },
    setGenre(state, action: PayloadAction<number>) {
      state.filter.genre = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.filter.sortBy = action.payload;
    },
  },
});

export const { setProducts, setTopProducts, setFilter, setAge, setSortBy, setGenre } = productsSlice.actions;

export default productsSlice.reducer;
