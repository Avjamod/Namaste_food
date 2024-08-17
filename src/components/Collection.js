import React, { useEffect, useState } from "react";
import { CDN_URL, RES_DATA_API } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
const Collection = () => {
  const { colId } = useParams();
  console.log(colId);
  const [collectionInfo, setCollectionInfo] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RES_DATA_API);
    const json = await data.json();

    setCollectionInfo(json?.data?.cards[0]?.card?.card);

    // const url = collectionInfo.imageGridCards?.info[0].entityId;
    // const urlParams = new URLSearchParams(url.split("?")[1]);
    // const collectionId = urlParams.get("collection_id");

    // console.log(collectionId);
  };
  return collectionInfo.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="p-4 m-4 ">
      <h1 className="font-bold text-2xl">{collectionInfo?.header?.title}</h1>
      <div className="">
        <div className="flex flex-wrap content-center bg-gray-100">
          {collectionInfo?.imageGridCards?.info?.map((item, index) => (
            <Link key={index} to={"/collection/" + index}>
              <img className="w-36 m-3 " src={`${CDN_URL}${item.imageId}`} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
