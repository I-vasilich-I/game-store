import { call, ForkEffect, put, takeEvery } from "redux-saga/effects";
import { setIsLoading } from "@/redux/store/form/formSlice";
import { setAlert, setError } from "@/redux/store/modal/modalSlice";
import { setUser } from "@/redux/store/user/userSlice";
import { IProfile } from "@/types";
import changeProfileInfoService from "@/api/apiProfile";
import SAGA_ACTIONS from "../sagaActions/sagaActions";

interface IAction {
  type: string;
  payload: IProfile;
}

function* changeProfileInfo({ payload: sendData }: IAction) {
  yield put(setIsLoading(true));
  try {
    const { data, status } = yield call(() => changeProfileInfoService(sendData));
    if (status === 200) {
      const { name: userName, password, ...rest } = data;
      localStorage.setItem("user", JSON.stringify({ userName, ...rest }));
      yield put(setUser({ userName, password, ...rest }));
      yield put(setAlert("Profile info changed"));
    } else {
      yield put(setError(data));
    }
  } catch (error) {
    console.error(error);
  }
  yield put(setIsLoading(false));
}

function* watchChangeProfileInfo(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_ACTIONS.PROFILE_CHANGE_INFO, changeProfileInfo);
}

// eslint-disable-next-line import/prefer-default-export
export { watchChangeProfileInfo };
