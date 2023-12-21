import { apiGetCategory } from "apis/app";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function fetchCategory() {
      const response = await apiGetCategory();
      setCategories(response.data);
    }
    fetchCategory();
  }, []);
  return (
    <div className="flex flex-col border h-[484px]">
      {categories &&
        categories?.map((category) => (
          <NavLink
            key={category?._id}
            to={category?.title}
            className={({ isActive }) =>
              isActive
                ? "bg-bgMain text-white px-7 py-14 text-base"
                : "px-5 py-4 text-base hover:text-colorMain"
            }
          >
            {category.title}
          </NavLink>
        ))}
    </div>
  );
};

export default Sidebar;
