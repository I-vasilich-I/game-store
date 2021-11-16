import { all, AllEffect, ForkEffect } from "redux-saga/effects";
import { watchAuthUser } from "./authSaga/authSaga";
import watchOnModalClose from "./modalSaga/modalSaga";

// TODO: add sagas
export default function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown> {
  yield all([watchAuthUser(), watchOnModalClose()]);
}
