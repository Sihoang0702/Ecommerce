import React from "react";
import { navigation } from "utils/constans";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <div className="w-full max-w-main h-[48px] py-2 border-y flex items-center">
      {navigation.map((nav) => (
        <NavLink
          className={({ isActive }) =>
            isActive ? "hover:text-colorMain transition-all text-colorMain pr-12" : "pr-12"
          }
          to={nav.path}
          key={nav.id}
        >
          {nav.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
