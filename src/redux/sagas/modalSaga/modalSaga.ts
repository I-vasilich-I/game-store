import { ForkEffect, put, takeEvery } from "redux-saga/effects";
import { setAuthFormType, setStatus } from "@/redux/store/form/formSlice";
import { closeModal, setIsProductEditForm } from "@/redux/store/modal/modalSlice";
import SAGA_ACTIONS from "../sagaActions/sagaActions";

function* onModalClose() {
  yield put(closeModal());
  yield put(setAuthFormType("signin"));
  yield put(setIsProductEditForm(false));
  yield put(setStatus(0));
}

function* watchOnModalClose(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_ACTIONS.MODAL_CLOSE, onModalClose);
}

export default watchOnModalClose;
