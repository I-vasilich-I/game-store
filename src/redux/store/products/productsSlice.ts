import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGame, IParams, SortByTypes } from "@/types";
import { getGamesFromLocalStorage } from "@/helpers";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getTopProducts,
  searchProducts,
  updateProduct,
} from "@/redux/thunk/productsThunk/productsThunk";

interface IProps {
  products: IGame[];
  topProducts: IGame[];
  searchGames: IGame[];
  filter: IParams;
  isProductsLoading: boolean;
  isProductUpdating: boolean;
  isSearching: boolean;
  editProduct: IGame | null;
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
    category: null,
  },
  isProductsLoading: false,
  isProductUpdating: false,
  isSearching: false,
  editProduct: null,
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
    setCategory(state, action: PayloadAction<string | null>) {
      state.filter.category = action.payload;
    },
    setIsProductsLoading(state, action: PayloadAction<boolean>) {
      state.isProductsLoading = action.payload;
    },
    setIsProductUpdating(state, action: PayloadAction<boolean>) {
      state.isProductUpdating = action.payload;
    },
    setIsSearching(state, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
    },
    setEditProduct(state, action: PayloadAction<IGame | null>) {
      state.editProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    // get products
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isProductsLoading = false;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.isProductsLoading = true;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isProductsLoading = false;
    });
    // get top products
    builder.addCase(getTopProducts.fulfilled, (state, action) => {
      state.topProducts = action.payload;
    });
    // search products
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.searchGames = action.payload;
      state.isSearching = false;
    });
    builder.addCase(searchProducts.pending, (state) => {
      state.isSearching = true;
    });
    builder.addCase(searchProducts.rejected, (state) => {
      state.isSearching = false;
    });
    // update product
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.isProductUpdating = false;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.isProductUpdating = true;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.isProductUpdating = false;
    });
    // delete product
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.isProductUpdating = false;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isProductUpdating = true;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.isProductUpdating = false;
    });
    // create product
    builder.addCase(createProduct.fulfilled, (state) => {
      state.isProductUpdating = false;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.isProductUpdating = true;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.isProductUpdating = false;
    });
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
  setCategory,
  setSearchGames,
  setIsProductsLoading,
  setIsProductUpdating,
  setIsSearching,
  setEditProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
