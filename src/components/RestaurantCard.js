import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla, veg } =
    resData.info;

  console.log(resData);
  return (
    <div className="m-3 w-44 bg-gray-100 hover:bg-gray-200">
      <label className="absolute cursor-pointer">
        {veg === true ? "🟩 " : "  "}
      </label>
      <img
        className="w-44 p-2 mx-0 h-36 object-cover"
        src={CDN_URL + cloudinaryImageId}
      ></img>

      <h3 className="px-2 py-1 font-bold">{name}</h3>
      <h5 className="px-2 ">{cuisines.join(", ")}</h5>
      <h5 className="px-2 ">{avgRating} star</h5>
      <h5 className="px-2 ">{costForTwo}</h5>
      <h5 className="px-2 pb-1">{sla?.slaString}</h5>
    </div>
  );
};

// export const withOpenRestaurant = (RestaurantCard) => {
//   return (props) => {
//     return (
//       <div>
//         <label>Open</label>
//         <RestaurantCard {...props} />
//       </div>
//     );
//   };
// };

export default RestaurantCard;
