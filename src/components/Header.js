import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import userContext from "../utils/userContext";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addItem, addUser, removeUser } from "../utils/userSlice";
import fetchCartItems from "../utils/firebase";

const Header = () => {
  const OnlineStatus = useOnlineStatus();
  const data = useContext(userContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const DispatchItems = async () => {
    const Items = await fetchCartItems();
    dispatch(addItem(Items));
  };

  const userInfo = useSelector((store) => store.user.user);
  const cartItem = useSelector((store) => {
    const userId = userInfo?.uid;
    const firstCartItem = store?.user?.cart?.items[0];
    return firstCartItem?.[userId];
  });
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/");
        DispatchItems();
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center justify-between bg-orange-50 drop-shadow-lg">
      <div className="">
        <img className="max-w-24" src={LOGO_URL} />
      </div>
      <div className="">
        <ul className="flex items-center">
          <li className="m-3 p-3">
            Online Status: {OnlineStatus ? "🟢" : "🔴"}
          </li>
          <li className="m-3 p-3">
            <Link to="/">Home</Link>
          </li>
          <li className="m-3 p-3">
            <Link to="/about">About Me</Link>
          </li>
          {/* <li className="m-3 p-3">
            <Link to="/contact">Contact</Link>
          </li> */}

          {userInfo && (
            <li className="m-3 p-3 ">
              <Link to="/cart">
                🛒-({Object?.keys(cartItem || {})?.length})
              </Link>
            </li>
          )}
          {userInfo ? (
            <button
              className="m-3 px-3 py-2 bg-green-100 hover:bg-green-200"
              onClick={handleSignOut}
            >
              LogOut
            </button>
          ) : (
            <Link to="/login">
              <button className="m-3 px-3 py-2 bg-green-100 hover:bg-green-200">
                Login
              </button>
            </Link>
          )}
          <li className="m-3">{data.loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
