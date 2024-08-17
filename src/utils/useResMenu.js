import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useResMenu = (resId) => {
  const [resInfo, setResInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const menu = await fetch(MENU_API + resId);
    const json = await menu.json();
    setResInfo(json);
  };
  return resInfo;
};

export default useResMenu;
