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
      state.products[game.id] = { game, amount, checked: false };
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
    removeProducts(state) {
      const { products } = state;
      Object.values(products).forEach(({ game, checked }) => game.id && checked && delete state.products[game.id]);
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeAllProducts(state) {
      state.products = {};
      localStorage.removeItem("cart");
    },
    setIsCheckedProduct(state, action: PayloadAction<{ id: number; checked: boolean }>) {
      const { id, checked } = action.payload;
      state.products[id].checked = checked;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const { addProduct, incrementAmount, decrementAmount, removeProducts, removeAllProducts, setIsCheckedProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
