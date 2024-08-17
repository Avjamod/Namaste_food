import React from "react";
import ItemList from "./ItemList";

const RestaurantCatagories = ({ data, showItem, setShowItem }) => {
  const handleClick = () => {
    setShowItem();
  };
  return (
    <div className=" w-6/12 bg-orange-50 my-2 shadow-lg p-3">
      <div
        className="flex justify-between cursor-pointer"
        onClick={handleClick}
      >
        <span className="font-bold text-xl">
          {data?.title} ({data?.itemCards?.length})
        </span>
        <span>⬇️</span>
      </div>
      {showItem && <ItemList item={data?.itemCards} />}
    </div>
  );
};

export default RestaurantCatagories;
