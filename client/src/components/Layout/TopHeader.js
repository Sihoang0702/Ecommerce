import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "utils/path";
import { getCurrentUser } from "store/auth/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import { logout, clearMessage } from "store/auth/authSlice";
import Swal from "sweetalert2";
const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthLogin, current, message } = useSelector((state) => state.auth);
  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      if (isAuthLogin) {
        dispatch(getCurrentUser());
      }
    }, 300);
    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [dispatch, isAuthLogin]);
  useEffect(() => {
    if (message) {
      Swal.fire({
        text: message,
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        title: "Message",
        showCancelButton: true,
      }).then((rs) => {
        dispatch(clearMessage());
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
  return (
    <div className="bg-bgMain w-full flex justify-center">
      <div className="w-full max-w-main text-xs flex justify-between items-center py-2 text-white">
        <div>
          <p>ORDER ONLINE OR CALL US (+1800) 000 8808 | VND </p>
        </div>
        <div>
          {isAuthLogin && current ? (
            <div className="flex items-center gap-x-2">
              <p className="select-none">
                welcome come <strong>{current?.lastName}</strong>
              </p>
              <span className="inline-block" onClick={() => dispatch(logout())}>
                <FiLogOut className="cursor-pointer"></FiLogOut>
              </span>
            </div>
          ) : (
            <Link className="hover:text-gray-600" to={`${path.LOGIN}`}>
              Sign In or Create Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
