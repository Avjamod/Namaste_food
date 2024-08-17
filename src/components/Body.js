import RestaurantCard from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RES_DATA_API } from "../utils/constants";
import Collection from "./Collection";
import useOnlineStatus from "../utils/useOnlineStatus";
import userContext from "../utils/userContext";
import { useSelector } from "react-redux";

export const Body = () => {
  const [ListOfRestaurant, setListOfRestaurant] = useState([]);

  const [filterListOfRestaurant, setFilterListOfRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");

  const { loggedInUser, setUserName } = useContext(userContext);

  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RES_DATA_API);

    const json = await data.json();

    //Optional Chaining
    setListOfRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setFilterListOfRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const OnlineStatus = useOnlineStatus();

  if (OnlineStatus === false) {
    return (
      <h1 className="text-center font-bold text-2xl">
        Look's Like You Are Offline,Please Check Your Internet Connection.
      </h1>
    );
  }

  //conditional rendering
  if (ListOfRestaurant?.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="">
      <div className="flex items-center justify-center ">
        <div className="mt-4 flex  items-center">
          <input
            type="text"
            className="border border-solid border-black p-1 m-2 w-56"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="m-2 p-2 bg-green-100 hover:bg-green-200 rounded-lg"
            onClick={() => {
              const filteredRestaurants = ListOfRestaurant.filter((res) => {
                return (
                  res.info.name
                    .replace(/\s+/g, "")
                    .toLowerCase()
                    .includes(searchText.toLowerCase().replace(/\s+/g, "")) ||
                  res.info.cuisines
                    .join("")
                    .replace(/\s+/g, "")
                    .toLowerCase()
                    .includes(searchText.toLowerCase().replace(/\s+/g, ""))
                );
              });
              setFilterListOfRestaurant(filteredRestaurants);
            }}
          >
            Search
          </button>
          <div className="ml-10">
            <label className="">UserName : </label>
            <input
              type="text"
              className="border border-black p-1"
              value={user?.displayName}
            />
          </div>
        </div>
      </div>
      {/* <Collection /> */}
      {/* <h1 className="font-bold text-2xl text-center my-2">
        -- Top Restaurants --
      </h1> */}
      <div className="flex flex-wrap mx-5 my-3">
        {filterListOfRestaurant?.map((res) => (
          <Link key={res.info.id} to={"/restaurant/" + res.info.id}>
            <RestaurantCard resData={res} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
