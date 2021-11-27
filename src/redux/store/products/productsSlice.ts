import { getGamesFromLocalStorage } from "@/helpers";
import { IGame, IParams, SortByTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProps {
  products: IGame[];
  topProducts: IGame[];
  searchGames: IGame[];
  filter: IParams;
  isProductsLoading: boolean;
}

const initialState: IProps = {
  products: [],
  topProducts: getGamesFromLocalStorage() || [],
  searchGames: [],
  filter: {
    sortBy: "name",
    ascend: 1,
    age: 0,
    genre: 1,
  },
  isProductsLoading: false,
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
    setSearchGames(state, action: PayloadAction<IGame[]>) {
      state.searchGames = action.payload;
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
    setSortBy(state, action: PayloadAction<SortByTypes>) {
      state.filter.sortBy = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.filter.ascend = action.payload === "Ascending" ? 1 : null;
    },
    setIsProductsLoading(state, action: PayloadAction<boolean>) {
      state.isProductsLoading = action.payload;
    },
  },
});

export const {
  setProducts,
  setTopProducts,
  setFilter,
  setAge,
  setSortBy,
  setGenre,
  setType,
  setSearchGames,
  setIsProductsLoading,
} = productsSlice.actions;

export default productsSlice.reducer;
