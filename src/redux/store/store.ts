import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/rootSaga";
import modalReducer from "./modal/modalSlice";
import formReducer from "./form/formSlice";
import userReducer from "./user/userSlice";
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    MODAL: modalReducer,
    FORM: formReducer,
    USER: userReducer,
    PRODUCTS: productsReducer,
    CART: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
