import React, { useEffect, useState } from "react";
import { CDN_URL, COLLECTION_API } from "../utils/constants";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

const CollectionCard = (onData) => {
  const [collectionData, setCollectionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(COLLECTION_API);
      const json = await data.json();
      setCollectionData(json?.data?.cards);
      const colId = json.data.cards[0].card.card.collectionId;
      console.log(colId);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = collectionData.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
    );
    setFilteredData(filtered);
  }, [collectionData]);

  return (
    <div>
      <div className="flex flex-wrap ">
        {filteredData.map((res) => (
          <Link
            key={res.card.card.info.id}
            to={"/restaurant/" + res.card.card.info.id}
          >
            <RestaurantCard resData={res.card.card} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionCard;
