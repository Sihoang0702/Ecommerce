import { Link } from "react-router-dom";
import { logout } from "store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import icons from "utils/icon";
import logo from "../../assets/logo.png";
import path from "utils/path";
import React, { useState } from "react";
import { isOpenModal } from "store/slice/globalSlice";
const Header = () => {
  const { BsFillTelephoneFill, MdEmail, BiSolidShoppingBagAlt, FaUserCircle } = icons;
  const { current } = useSelector((state) => state.auth);
  const [isShowOption, setIsShowOption] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutOption = (e) => {
      const profile = document.querySelector("#profile");
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };
    document.addEventListener("click", handleClickOutOption);
    return () => {
      document.removeEventListener("click", handleClickOutOption);
    };
  }, []);
  const openModal = () => {
    dispatch(isOpenModal());
  };
  return (
    <>
      <div className=" w-full flex justify-between max-w-main h-[110px] py-9">
        <Link to={`/${path.HOME}`}>
          <img src={logo} className="w-full max-w-[234px] object-contain" alt="" />
        </Link>
        <div className="flex text-sm ">
          <div className="flex flex-col px-6 border-r-2 ">
            <span className="flex gap-4 items-center">
              <BsFillTelephoneFill className="text-colorMain" />
              <span className="font-semibold">(+1800) 000 8808</span>
            </span>
            <p>Mon-Sat 9:00AM - 8:00PM</p>
            <span></span>
          </div>
          <div className="flex flex-col text-sm px-6 border-r-2">
            <span className="flex gap-4 items-center">
              <MdEmail className="text-colorMain" />
              <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
            </span>
            <p className="text-center">Online Support 24/7</p>
          </div>
          <button
            onClick={openModal}
            className="flex items-center justify-center gap-2 px-6 border-r-2"
          >
            <BiSolidShoppingBagAlt />
            <span>{current?.cart?.length || 0} item(s)</span>
          </button>
          {current && (
            <div
              id="profile"
              onClick={() => setIsShowOption((prev) => !prev)}
              className="flex flex-col items-center gap-4 justify-center px-6 cursor-pointer relative"
            >
              <div className="flex items-center gap-x-2">
                <button className="inline-block">
                  <FaUserCircle size={24} />
                </button>
                <span>Profile</span>
              </div>
              {isShowOption && (
                <div className="absolute rounded top-full left-0 bg-gray-100 shadow-sm min-w-[200px] border z-50 py-2 flex flex-col gap-y-2">
                  <Link
                    className="p-2 text-center hover:text-colorMain"
                    to={`${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Personal
                  </Link>
                  {current.role === 96 && (
                    <Link
                      className="p-2 text-center hover:text-colorMain"
                      to={`${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Admin workspace
                    </Link>
                  )}
                  <button className="hover:text-colorMain" onClick={() => dispatch(logout())}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
