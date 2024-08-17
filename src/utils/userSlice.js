import { createSlice } from "@reduxjs/toolkit";
import fetchCartItems from "./firebase";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    cart: {
      items: [],
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    addItem: (state, action) => {
      state.cart.items.length = 0;
      state.cart.items.push(action.payload);
    },
    clearCart: (state) => {
      state.cart.items.length = 0;
    },
    removeItem: (state) => {
      state.cart.items.pop();
    },
  },
});

export const { addUser, removeUser, addItem, clearCart, removeItem } =
  userSlice.actions;

export const fetchCart = () => async (dispatch) => {
  try {
    const cartItems = await fetchCartItems();
    dispatch(addItem(cartItems));
  } catch (error) {
    alert(error.message);
  }
};
export default userSlice.reducer;
