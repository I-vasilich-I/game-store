import { call, ForkEffect, put, takeLatest } from "redux-saga/effects";
import { setProducts, setSearchGames } from "@/redux/store/products/productsSlice";
import { setIsLoading } from "@/redux/store/form/formSlice";
import { getGames, searchRequest } from "@/api/apiProducts";
import { IGame, IParams } from "@/types";
import SAGA_ACTIONS from "../sagaActions/sagaActions";

interface IProps {
  type: string;
  payload: IParams;
}

interface ISearchProps {
  type: string;
  payload: string;
}

function* getProducts({ payload: params }: IProps) {
  try {
    const data: IGame[] = yield call(() => getGames(params));
    yield put(setProducts(data));
  } catch (error) {
    console.error(error);
  }
}

function* watchGetProducts(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(SAGA_ACTIONS.GET_PRODUCTS, getProducts);
}

function* searchProducts({ payload: search }: ISearchProps) {
  yield put(setIsLoading(true));
  try {
    const data: IGame[] | null = yield call(() => searchRequest(search));
    yield put(setSearchGames(data || []));
  } catch (error) {
    console.error(error);
  }
  yield put(setIsLoading(false));
}

function* watchSearchProducts(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(SAGA_ACTIONS.SEARCH_PRODUCTS, searchProducts);
}

export { watchGetProducts, watchSearchProducts };
