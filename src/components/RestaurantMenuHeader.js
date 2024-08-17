import { CDN_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import useResMenu from "../utils/useResMenu";
import PureVeg from "./PureVeg";

const RestaurantMenuHeader = () => {
  const { resId } = useParams();

  const restaurantInfo = useResMenu(resId);

  if (restaurantInfo.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="border  py-2 px-8 shadow-2xl">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">
          <h1 className="px-1 py-0 font-bold text-2xl ">
            😋 {restaurantInfo?.data?.cards[2]?.card?.card?.info?.name}
          </h1>
          <h4 className="p-1">
            📍 {restaurantInfo?.data?.cards[2]?.card?.card?.info?.locality} -{" "}
            {restaurantInfo?.data?.cards[2]?.card?.card?.info?.areaName}
          </h4>
          <h5 className="p-1">
            💵
            {
              restaurantInfo?.data?.cards[2]?.card?.card?.info
                ?.costForTwoMessage
            }
          </h5>
          <p className="p-1">
            ⭐ {restaurantInfo?.data?.cards[2]?.card?.card?.info?.avgRating}
          </p>
          {restaurantInfo?.data?.cards[2]?.card?.card?.info?.veg ? (
            <PureVeg />
          ) : (
            ""
          )}
        </div>
        <div className="">
          <img
            className="mx-8 rounded-sm w-48"
            src={
              CDN_URL +
              restaurantInfo?.data?.cards[2]?.card?.card?.info
                ?.cloudinaryImageId
            }
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenuHeader;
