import React, { Fragment, useState } from "react";
import { memberSidebar } from "utils/constans";
import { NavLink } from "react-router-dom";
import { AiFillCaretDown, AiFillCaretLeft } from "react-icons/ai";
import clsx from "clsx";
import { useSelector } from "react-redux";
import avatarDefault from "../../assets/avatar.png";
const activeStyle = "px-4 py-2 flex items-center gap-2 text-md bg-blue-500 text-white";
const notActiveStyle =
  "px-4 py-2 flex items-center gap-2 text-md hover:bg-blue-500 hover:text-white ";
const MemberSidebar = () => {
  const [isShow, setIsShow] = useState([]);
  const { current } = useSelector((state) => state.auth);
  const handleShowTab = (tabId) => {
    tabId = Number(tabId);
    if (isShow.some((el) => el === tabId)) setIsShow((prev) => prev.filter((el) => el !== tabId));
    else setIsShow((prev) => [...prev, tabId]);
  };
  return (
    <div className="min-h-screen shadow-lg">
      <div className="flex justify-center flex-col items-center py-4 gap-4">
        <div className="flex flex-col items-center gap-x-2">
          <img className="w-16 h-16 object-cover" src={current.avatar || avatarDefault} alt="" />
          <strong>{`${current.firstName} ${current.lastName}`}</strong>
        </div>
      </div>
      {memberSidebar.map((el) => (
        <Fragment key={el.id}>
          {el.type === "Single" && (
            <NavLink
              to={el.path}
              className={({ isActive }) => clsx(isActive ? activeStyle : notActiveStyle)}
            >
              <span>{el.icon}</span>
              <span>{el.text}</span>
            </NavLink>
          )}
          {el.type === "parent" && (
            <div onClick={() => handleShowTab(el.id)} className="flex flex-col">
              <div className="px-4 py-2 flex w-full items-center justify-between gap-2 text-md hover:text-white hover:bg-gray-500 cursor-pointer select-none">
                <div className="flex items-center gap-1">
                  <span>{el.icon}</span>
                  <span>{el.text}</span>
                </div>
                {isShow.some((id) => id === el.id) ? <AiFillCaretDown /> : <AiFillCaretLeft />}
              </div>

              {isShow.some((id) => +id === +el.id) && (
                <div className="flex flex-col justify-center">
                  {el.submenu.map((el) => (
                    <NavLink
                      to={el.path}
                      key={el.text}
                      onClick={(e) => e.stopPropagation()}
                      className={({ isActive }) => clsx(isActive ? activeStyle : notActiveStyle)}
                    >
                      <span className="pl-4"> {el.text}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default MemberSidebar;
