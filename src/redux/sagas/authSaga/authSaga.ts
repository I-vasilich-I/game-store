import { call, takeEvery, ForkEffect, put } from "redux-saga/effects";
import { setUserProp } from "@/redux/store/user/userSlice";
import { setIsLoading, setStatus } from "@/redux/store/form/formSlice";
import { setError } from "@/redux/store/modal/modalSlice";
import authenticate from "@/api/apiAuth";
import SAGA_ACTIONS from "../sagaActions/sagaActions";

interface IAction {
  type: string;
  payload: {
    email: string;
    password: string;
    url: string;
  };
}

function* authUser({ payload: { email, password, url } }: IAction) {
  yield put(setIsLoading(true));
  try {
    const { data, status } = yield call(() => authenticate({ url, sendData: { email, password } }));

    if (status === 200 || status === 201) {
      localStorage.setItem("user", JSON.stringify({ userName: data, email }));
      yield put(setUserProp({ prop: "userName", value: data }));
      yield put(setStatus(status));
    } else {
      yield put(setError(data));
    }

    yield put(setIsLoading(false));
  } catch (error) {
    console.error(error);
  }
}

function* watchAuthUser(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_ACTIONS.AUTH_USER, authUser);
}

// eslint-disable-next-line import/prefer-default-export
export { watchAuthUser };
