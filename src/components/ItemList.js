import React from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/userSlice";
import fetchCartItems, { database } from "../utils/firebase";
import { ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();

  const handleAddItem = async (i) => {
    if (user === null) {
      alert("please login first.");
      navigate("/login");
      return;
    }
    const newDoc = push(ref(database, "cart/" + user?.uid));
    set(newDoc, {
      //addItem(i)
      item: i,
    })
      .then(() => {})
      .catch((error) => {
        alert(error.message);
      });
    const cartItems = await fetchCartItems();
    dispatch(addItem(cartItems));
  };

  return (
    <div className="">
      <ul className="m-2">
        {item.map((i) => (
          <div
            key={i.card.info.id}
            className="border-b-2 p-2 m-2 flex justify-between"
          >
            <div className="w-9/12 p-1">
              <h1 className="flex items-center">
                {i.card.info.isVeg ? "🟩" : ""}

                {i.card.info.isBestseller ? (
                  <div className="border border-gray-400 px-1 rounded-2xl font-mono text-sm bg-gray-200">
                    Best Seller
                  </div>
                ) : (
                  ""
                )}
              </h1>

              <h1 className="p-1 font-bold text-lg">{i.card?.info?.name}</h1>
              <h3 className="p-1 font-bold text-sm">
                ₹{" "}
                {i.card?.info?.price
                  ? i.card?.info?.price / 100
                  : i.card?.info?.defaultPrice / 100}{" "}
                Only
              </h3>
              {i.card.info.ratings.aggregatedRating.rating ? (
                <p className="text-xs  font-bold">
                  ⭐{i.card.info.ratings.aggregatedRating.rating} (
                  {i.card.info.ratings.aggregatedRating.ratingCountV2})
                </p>
              ) : (
                ""
              )}

              <p className="text-sm p-1"> {i.card.info.description}</p>
            </div>
            <div className="w-3/12 p-1 ">
              <button
                className="bg-green-100 p-1 absolute shadow-lg hover:bg-green-200 hover:shadow-sm rounded-md"
                onClick={() => handleAddItem(i)}
              >
                Add +
              </button>

              <img
                className="rounded-sm h-36 w-auto object-cover"
                src={CDN_URL + i.card.info.imageId}
              />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
