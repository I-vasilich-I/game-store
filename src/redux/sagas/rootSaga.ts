import { all, AllEffect } from "redux-saga/effects";

// TODO: add sagas
export default function* rootSaga(): Generator<AllEffect<never>, void, unknown> {
  yield all([
    /* here going to be an array of sagas*/
  ]);
}
