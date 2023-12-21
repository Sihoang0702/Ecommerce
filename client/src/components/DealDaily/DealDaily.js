import React, { useEffect, useState, memo } from "react";
import icons from "utils/icon";
import { apiGetProducts } from "apis/product";
import { formatMoney, renderStartNumber, secondsToHms } from "utils/heplers";
import dayjs from "dayjs";
import CountDown from "./CountDown";
let idInterval;
const DealDaily = () => {
  const { AiFillStar, FiMenu } = icons;
  const [dealDaily, setDealDaily] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  async function fetchDailyProduct() {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 7),
      totalRatings: 5,
    });
    if (response?.success) {
      setDealDaily(response.data[0]);
      const today = `${dayjs().format("MM/DD/YYYY")} '5:00:00`; //khoang cach toi 5h
      const seconds = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const number = secondsToHms(seconds);
      setHours(number.h);
      setMinutes(number.m);
    } else {
      setHours(0);
      setMinutes(59);
      setSeconds(59);
    }
  }
  // useEffect(() => {
  //   fetchDailyProduct();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect(() => {
    clearInterval(idInterval);
    fetchDailyProduct();
  }, [expireTime]);

  useEffect(() => {
    idInterval = setTimeout(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(60);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [seconds, minutes, hours, expireTime]);

  return (
    <div className="border w-full flex-auto">
      <div className="flex items-center justify-between p-4">
        <span className="flex-3">
          <AiFillStar size={20} className="text-colorMain" />
        </span>
        <h1 className="flex-5 font-semibold text-xl text-[#6a6a6a]">DEAL DAILY</h1>
        <span className="flex-3"></span>
      </div>
      <div className="pt-8 flex flex-col items-center gap-2">
        <img
          src={
            dealDaily?.thumbnail ||
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt=""
          className="w-full object-contain"
        />
        <h1 className="line-clamp-1 text-center">{dealDaily?.title}</h1>
        <span className="flex h-4">{renderStartNumber(parseInt(dealDaily?.totalRatings, 20))}</span>
        <span key="price">{`${formatMoney(dealDaily?.price)}`} VND</span>
      </div>
      <div className="mt-4 px-4 ">
        <div className="flex items-center justify-center gap-2">
          <CountDown unit="Hours" number={hours}></CountDown>
          <CountDown unit="Minutes" number={minutes}></CountDown>
          <CountDown unit="Seconds" number={seconds}></CountDown>
        </div>
        <button
          type="submit"
          className="mt-5 flex gap-2 items-center justify-center w-full bg-bgMain hover:bg-gray-600 hover:text-white transition-all py-2 text-white"
        >
          <FiMenu></FiMenu>
          <span className="">OPTIONS</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
