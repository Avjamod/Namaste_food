import { CDN_URL } from "../utils/constants";
import RestaurantMenuHeader from "./RestaurantMenuHeader";
import { useParams } from "react-router-dom";
import useResMenu from "../utils/useResMenu";
import Shimmer from "./Shimmer";
import RestaurantCatagories from "./RestaurantCatagories";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useResMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  const catagories =
    resInfo?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(catagories);

  return resInfo.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="mt-4 flex flex-col items-center">
      <RestaurantMenuHeader />
      <h1 className="font-semibold my-2">---- MENU ----</h1>
      {catagories.map((catagory, index) => (
        <RestaurantCatagories
          key={catagory?.card?.card?.title}
          data={catagory?.card?.card}
          showItem={index === showIndex ? true : false}
          setShowItem={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
