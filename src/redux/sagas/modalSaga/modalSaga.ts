import { ForkEffect, put, takeEvery } from "redux-saga/effects";
import { setAuthFormType, setStatus } from "@/redux/store/form/formSlice";
import { closeModal, setModalType } from "@/redux/store/modal/modalSlice";
import SAGA_ACTIONS from "../sagaActions/sagaActions";

function* onModalClose() {
  yield put(closeModal());
  yield put(setAuthFormType("signin"));
  yield put(setStatus(0));
  yield put(setModalType("auth"));
}

function* watchOnModalClose(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_ACTIONS.MODAL_CLOSE, onModalClose);
}

export default watchOnModalClose;
