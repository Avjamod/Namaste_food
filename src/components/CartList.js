import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { child, getDatabase, ref, remove } from "firebase/database";
import { app } from "../utils/firebase";

const CartList = () => {
  const userId = useSelector((store) => store?.user?.user?.uid);
  const [total, setTotal] = useState([]);
  const data = useSelector((store) => store?.user?.cart?.items[0]?.[userId]);
  const items = Object.values(data || {}).map(
    (entry) => entry?.item?.card?.info
  );

  // const deleteItem = async (index) => {
  //   const db = getDatabase(app);
  //   const dbRef = ref(db, `cart/${userId}`);
  //   const i = dbRef.child(index);
  //   console.log(dbRef);
  // };
  return (
    <div>
      {items.map((i, index) => (
        <div className="flex w-full justify-between m-4 border-b-2">
          <div className="">
            <h1 className="font-bold">{i?.name}</h1>
            <p className="">{i?.defaultPrice / 100 || i?.price / 100} ₹.</p>
            {i?.ratings?.aggregatedRating?.rating && (
              <p>
                ⭐{i?.ratings?.aggregatedRating?.rating}(
                {i?.ratings?.aggregatedRating?.ratingCountV2})
              </p>
            )}
            <p>{i?.description}</p>
          </div>
          {i?.imageId && <img className="w-24" src={CDN_URL + i?.imageId} />}

          {/* <button
            className="bg-red-200 m-2 p-2 "
            onClick={() => {
              deleteItem(index);
            }}
          >
            Remove item
          </button> */}
        </div>
      ))}
    </div>
  );
};

export default CartList;
