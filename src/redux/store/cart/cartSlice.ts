import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, IGame } from "@/types";
import { getCartProductsFromLocalStorage } from "@/helpers";

const initialState: ICart = {
  products: getCartProductsFromLocalStorage() || {},
};

export const cartSlice = createSlice({
  name: "CART",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IGame>) {
      const game = action.payload;
      const { products } = state;

      if (!game.id) {
        return;
      }

      const product = products[game.id];
      const amount = (product?.amount || 0) + 1;
      state.products[game.id] = { game, amount };
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    incrementAmount(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.products[id].amount++;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    decrementAmount(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.products[id].amount--;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeProduct(state, action: PayloadAction<number>) {
      const id = action.payload;
      delete state.products[id];
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const { addProduct, incrementAmount, decrementAmount, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
