import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    clearCart: (state, action) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
    addProduct: (state, action) => {
      let foundProductIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      // console.log({ payload: action.payload, foundProductIndex });
      if (foundProductIndex !== -1) {
        state.products[foundProductIndex].quantity += action.payload.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    deleteProduct: (state, { payload }) => {
      state.quantity -= 1;
      state.products = state.products.filter(
        ({ _id: id, size, color }) =>
          id !== payload.id || size !== payload.size || color !== payload.color
      );
      state.total -= payload.totalPrice;
    },
  },
});

export const { addProduct, deleteProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
