import { all, AllEffect, ForkEffect } from "redux-saga/effects";
import { watchAuthUser } from "./authSaga/authSaga";
import watchOnModalClose from "./modalSaga/modalSaga";
import { watchGetProducts } from "./productsSaga/productsSaga";
import { watchChangePassword, watchChangeProfileInfo, watchChangeProfilePhoto } from "./profileSaga/profileSaga";

export default function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown> {
  yield all([
    watchAuthUser(),
    watchOnModalClose(),
    watchChangeProfileInfo(),
    watchChangeProfilePhoto(),
    watchChangePassword(),
    watchGetProducts(),
  ]);
}
