import { call, ForkEffect, put, takeEvery } from "redux-saga/effects";
import { setIsLoading, setIsPhotoLoading, setIsSaving, setStatus } from "@/redux/store/form/formSlice";
import { setAlert, setError } from "@/redux/store/modal/modalSlice";
import { setUser } from "@/redux/store/user/userSlice";
import { IProfile } from "@/types";
import {
  changePasswordService,
  changeProfileInfoService,
  changeProfilePhotoService,
  uploadPhoto,
} from "@/api/apiProfile";
import SAGA_ACTIONS from "../sagaActions/sagaActions";

interface IAction {
  type: string;
  payload: IProfile;
}

interface IPhotoAction {
  type: string;
  payload: {
    email: string;
    photo: File;
  };
}

interface IPasswordAction {
  type: string;
  payload: {
    email: string;
    password: string;
  };
}

function* changeProfileInfo({ payload: sendData }: IAction) {
  yield put(setIsSaving(true));
  try {
    const { data, status } = yield call(() => changeProfileInfoService(sendData));
    if (status === 200) {
      const { name: userName, password, isAdmin, ...rest } = data;
      const isAdminT = isAdmin === "true";
      localStorage.setItem("user", JSON.stringify({ userName, ...rest }));
      yield put(setUser({ userName, password, isAdmin: isAdminT, ...rest }));
      yield put(setAlert("Profile info changed"));
    } else {
      yield put(setError(data));
    }
  } catch (error) {
    console.error(error);
  }
  yield put(setIsSaving(false));
}

function* watchChangeProfileInfo(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_ACTIONS.PROFILE_CHANGE_INFO, changeProfileInfo);
}

function* changeProfilePhoto({ payload: { email, photo } }: IPhotoAction) {
  yield put(setIsPhotoLoading(true));
  try {
    const photoUrl: string = yield call(() => uploadPhoto(photo));
    const { data, status } = yield call(() => changeProfilePhotoService({ email, photo: photoUrl }));
    if (status === 200) {
      const { name: userName, password, isAdmin, ...rest } = data;
      const isAdminT = isAdmin === "true";
      localStorage.setItem("user", JSON.stringify({ userName, isAdmin: isAdminT, ...rest }));
      yield put(setUser({ userName, password, isAdmin: isAdminT, ...rest }));
      yield put(setAlert("Profile photo changed"));
    } else {
      yield put(setError(data));
    }
  } catch (error) {
    console.error(error);
  }
  yield put(setIsPhotoLoading(false));
}

function* watchChangeProfilePhoto(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_ACTIONS.PROFILE_CHANGE_PHOTO, changeProfilePhoto);
}

function* changePassword({ payload: { email, password } }: IPasswordAction) {
  yield put(setIsLoading(true));
  try {
    const { data, status } = yield call(() => changePasswordService({ email, password }));
    if (status === 200) {
      const { name: userName, password: pass, isAdmin, ...rest } = data;
      const isAdminT = isAdmin === "true";
      localStorage.setItem("user", JSON.stringify({ userName, isAdmin: isAdminT, ...rest }));
      yield put(setUser({ userName, password: pass, isAdmin: isAdminT, ...rest }));
      yield put(setAlert("Password changed"));
      yield put(setStatus(status));
    } else {
      yield put(setError(data));
    }
  } catch (error) {
    console.error(error);
  }
  yield put(setIsLoading(false));
}

function* watchChangePassword(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_ACTIONS.PROFILE_CHANGE_PASSWORD, changePassword);
}

export { watchChangeProfileInfo, watchChangeProfilePhoto, watchChangePassword };
