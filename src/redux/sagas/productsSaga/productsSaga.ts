import { call, ForkEffect, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import {
  setIsProductsLoading,
  setIsProductUpdating,
  setIsSearching,
  setProducts,
  setSearchGames,
  setTopProducts,
} from "@/redux/store/products/productsSlice";
import {
  createProductService,
  deleteProductService,
  getGames,
  getTopGames,
  searchRequest,
  updateProductService,
} from "@/api/apiProducts";
import { setAlert, setError } from "@/redux/store/modal/modalSlice";
import { IGame } from "@/types";
import SAGA_ACTIONS from "../sagaActions/sagaActions";

interface ISearchProps {
  type: string;
  payload: string;
}

interface IUpdateProduct {
  type: string;
  payload: IGame;
}

interface IDeleteProduct {
  type: string;
  payload: string;
}

function* getProducts() {
  const { filter } = yield select((state) => state.PRODUCTS);
  yield put(setIsProductsLoading(true));
  try {
    const data: IGame[] = yield call(() => getGames(filter));
    yield put(setProducts(data));
  } catch (error) {
    console.error(error);
  }
  yield put(setIsProductsLoading(false));
}

function* watchGetProducts(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(SAGA_ACTIONS.GET_PRODUCTS, getProducts);
}

function* searchProducts({ payload: search }: ISearchProps) {
  yield put(setIsSearching(true));
  try {
    const data: IGame[] | null = yield call(() => searchRequest(search));
    yield put(setSearchGames(data || []));
  } catch (error) {
    console.error(error);
  }
  yield put(setIsSearching(false));
}

function* watchSearchProducts(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(SAGA_ACTIONS.SEARCH_PRODUCTS, searchProducts);
}

function* getTopProducts() {
  try {
    const data: IGame[] | null = yield call(() => getTopGames());
    yield put(setTopProducts(data || []));
    localStorage.setItem("games", JSON.stringify({ data, date: new Date() }));
  } catch (error) {
    console.error(error);
  }
}

function* watchGetTopProducts(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(SAGA_ACTIONS.GET_TOP_PRODUCTS, getTopProducts);
}

function* updateProduct({ payload: game }: IUpdateProduct) {
  yield put(setIsProductUpdating(true));
  try {
    const { status, data } = yield call(() => updateProductService(game));

    if (status === 200) {
      yield put(setAlert(data));
      yield put(setIsProductUpdating(false));
      yield getProducts();
      yield getTopProducts();
    } else {
      yield put(setError(data));
      yield put(setIsProductUpdating(false));
    }
  } catch (error) {
    console.error(error);
  }
}

function* watchUpdateProduct(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_ACTIONS.UPDATE_PRODUCT, updateProduct);
}

function* createProduct({ payload: game }: IUpdateProduct) {
  yield put(setIsProductUpdating(true));
  try {
    const { status, data } = yield call(() => createProductService(game));

    if (status === 200) {
      yield put(setAlert(data));
      yield put(setIsProductUpdating(false));
      yield getProducts();
      yield getTopProducts();
    } else {
      yield put(setError(data));
      yield put(setIsProductUpdating(false));
    }
  } catch (error) {
    console.error(error);
  }
}

function* watchCreateProduct(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_ACTIONS.CREATE_PRODUCT, createProduct);
}

function* deleteProduct({ payload: gameId }: IDeleteProduct) {
  yield put(setIsProductUpdating(true));
  try {
    const { status, data } = yield call(() => deleteProductService(gameId));

    if (status === 200) {
      yield put(setAlert(data));
      yield put(setIsProductUpdating(false));
      yield getProducts();
      yield getTopProducts();
    } else {
      yield put(setError(data));
      yield put(setIsProductUpdating(false));
    }
  } catch (error) {
    console.error(error);
  }
}

function* watchDeleteProduct(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_ACTIONS.DELETE_PRODUCT, deleteProduct);
}

export {
  watchGetProducts,
  watchSearchProducts,
  watchGetTopProducts,
  watchUpdateProduct,
  watchCreateProduct,
  watchDeleteProduct,
};
