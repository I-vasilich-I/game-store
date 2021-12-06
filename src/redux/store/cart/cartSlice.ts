import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, IGame } from "@/types";
import { getCartProductsFromLocalStorage } from "@/helpers";

const initialState: ICart = {
  products: getCartProductsFromLocalStorage() || {},
  checkAll: false,
};

export const cartSlice = createSlice({
  name: "CART",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<IGame>) {
      const game = action.payload;
      const { products } = state;
      const product = products[game.id];
      const amount = (product?.amount || 0) + 1;
      state.products[game.id] = { game, amount, checked: false };
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    incrementAmount(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.products[id].amount++;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    decrementAmount(state, action: PayloadAction<string>) {
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
      state.checkAll = false;
      localStorage.removeItem("cart");
    },
    setIsCheckedProduct(state, action: PayloadAction<{ id: string; checked: boolean }>) {
      const { id, checked } = action.payload;
      state.products[id].checked = checked;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    setCheckAllCheckBoxes(state) {
      const prevCheckAll = state.checkAll;
      state.checkAll = !prevCheckAll;
      Object.values(state.products).forEach((elem) => {
        const newElem = elem;
        newElem.checked = !prevCheckAll;
      });
    },
    setCheckAll(state, action: PayloadAction<boolean>) {
      state.checkAll = action.payload;
    },
  },
});

export const {
  addProduct,
  incrementAmount,
  decrementAmount,
  removeProducts,
  removeAllProducts,
  setIsCheckedProduct,
  setCheckAllCheckBoxes,
  setCheckAll,
} = cartSlice.actions;

export default cartSlice.reducer;
