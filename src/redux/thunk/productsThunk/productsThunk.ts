import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAlert, setError } from "@/redux/store/modal/modalSlice";
import THUNK_ACTIONS from "@/redux/thunk/actions/thunkActions";
import {
  createProductService,
  deleteProductService,
  getGames,
  getTopGames,
  searchRequest,
  updateProductService,
} from "@/api/apiProducts";
import { IGame, IParams } from "@/types";
import { setLocalStorageItem } from "@/helpers";

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

const getProducts = createAsyncThunk(THUNK_ACTIONS.GET_PRODUCTS, async (_, thunkAPI) => {
  const {
    PRODUCTS: { filter },
  } = thunkAPI.getState() as { PRODUCTS: IProps };

  const data = await getGames(filter);
  return data;
});

const getTopProducts = createAsyncThunk(THUNK_ACTIONS.GET_TOP_PRODUCTS, async () => {
  const data = await getTopGames();
  setLocalStorageItem("games", { data, date: new Date() });

  return data;
});

const searchProducts = createAsyncThunk(THUNK_ACTIONS.SEARCH_PRODUCTS, async (search: string) => {
  const data = await searchRequest(search);

  return data;
});

const updateProduct = createAsyncThunk(THUNK_ACTIONS.UPDATE_PRODUCT, async (game: IGame, thunkAPI) => {
  const { data, status } = await updateProductService(game);
  if (status === 200) {
    thunkAPI.dispatch(setAlert(data));
    thunkAPI.dispatch(getProducts());
    thunkAPI.dispatch(getTopProducts());
  } else {
    thunkAPI.dispatch(setError(data));
  }
});

const deleteProduct = createAsyncThunk(THUNK_ACTIONS.DELETE_PRODUCT, async (gameId: string, thunkAPI) => {
  const { data, status } = await deleteProductService(gameId);
  if (status === 200) {
    thunkAPI.dispatch(setAlert(data));
    thunkAPI.dispatch(getProducts());
    thunkAPI.dispatch(getTopProducts());
  } else {
    thunkAPI.dispatch(setError(data));
  }
});

const createProduct = createAsyncThunk(THUNK_ACTIONS.CREATE_PRODUCT, async (game: IGame, thunkAPI) => {
  const { data, status } = await createProductService(game);
  if (status === 200) {
    thunkAPI.dispatch(setAlert(data));
    thunkAPI.dispatch(getProducts());
    thunkAPI.dispatch(getTopProducts());
  } else {
    thunkAPI.dispatch(setError(data));
  }
});

export { getProducts, getTopProducts, searchProducts, updateProduct, deleteProduct, createProduct };
