import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/userSlice";
import CartList from "./CartList";
import { getDatabase, ref, remove } from "firebase/database";
import { app } from "../utils/firebase";

const Cart = () => {
  const cartItems = useSelector((store) => store.user.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "cart");
    await remove(dbRef);
    dispatch(clearCart());
  };
  return (
    <div className="text-center p-4 m-4">
      <h1 className="font-bold text-2xl">Cart</h1>
      <button
        className="bg-red-300 p-1 m-1 rounded-lg "
        onClick={handleClearCart}
      >
        Clear 🛒
      </button>
      <div className="w-7/12 m-auto text-left  ">
        {cartItems?.length !== 0 ? (
          <CartList item={cartItems} />
        ) : (
          <h1 className="text-center">
            Your cart is empty.Add items to your cart
          </h1>
        )}
        {/* <p>{total}</p> */}
      </div>
    </div>
  );
};

export default Cart;
