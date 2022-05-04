import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";
import formReducer from "./form/formSlice";
import userReducer from "./user/userSlice";
import productsReducer from "./products/productsSlice";
import cartReducer from "./cart/cartSlice";

export const store = configureStore({
  reducer: {
    MODAL: modalReducer,
    FORM: formReducer,
    USER: userReducer,
    PRODUCTS: productsReducer,
    CART: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
