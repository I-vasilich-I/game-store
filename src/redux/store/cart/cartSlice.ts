import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICart, ICartProducts, IGame } from "@/types";
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from "@/helpers";

const initialState: ICart = {
  products: getLocalStorageItem<ICartProducts>("cart") || {},
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
      setLocalStorageItem("cart", state.products);
    },
    incrementAmount(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.products[id].amount++;
      setLocalStorageItem("cart", state.products);
    },
    decrementAmount(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.products[id].amount--;
      setLocalStorageItem("cart", state.products);
    },
    removeProducts(state) {
      const { products } = state;
      Object.values(products).forEach(({ game, checked }) => game.id && checked && delete state.products[game.id]);
      setLocalStorageItem("cart", state.products);
    },
    removeAllProducts(state) {
      state.products = {};
      state.checkAll = false;
      removeLocalStorageItem("cart");
    },
    setIsCheckedProduct(state, action: PayloadAction<{ id: string; checked: boolean }>) {
      const { id, checked } = action.payload;
      state.products[id].checked = checked;
      setLocalStorageItem("cart", state.products);
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
