import { call, ForkEffect, put, takeEvery } from "redux-saga/effects";
import { setProducts } from "@/redux/store/products/productsSlice";
import { getGames } from "@/api/apiProducts";
import { IGame, IParams } from "@/types";
import SAGA_ACTIONS from "../sagaActions/sagaActions";

interface IProps {
  type: string;
  payload: IParams;
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
  yield takeEvery(SAGA_ACTIONS.GET_PRODUCTS, getProducts);
}

// eslint-disable-next-line import/prefer-default-export
export { watchGetProducts };
