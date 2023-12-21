import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { colors } from "utils/constans";
import { createSearchParams, useParams, useNavigate } from "react-router-dom";
import { apiGetProducts } from "apis/product";
import { formatMoney } from "utils/heplers";
import useDebounce from "../../hooks/useDebounce";
import { toast } from "react-toastify";
const SearchItems = ({ name, activeClick, onClick = () => {}, type = "checkbox" }) => {
  const [selected, setSelected] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const { category } = useParams();
  const navigate = useNavigate();
  const handleSelectColor = (e) => {
    const alreadyColor = selected.find((select) => select === e.target.value);
    if (alreadyColor) setSelected((prev) => prev.filter((item) => item !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
  };
  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate(`/${category}`);
    }
  }, [category, navigate, selected]);
  useEffect(() => {
    async function fetchBestPriceProduct() {
      const response = await apiGetProducts({ sort: "-price", limit: 1 });
      setBestPrice(response.data[0].price);
    }
    if (type === "input") {
      fetchBestPriceProduct();
    }
  }, [type]);
  const debouncePriceForm = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    const data = {};
    if (Number(price.from) > 0) {
      data.from = price.from;
    }
    if (Number(price.to) > 0) {
      data.to = price.to;
    }
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(data).toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, navigate, debouncePriceForm, debouncePriceTo]);
  useEffect(() => {
    if (price.from && price.to && price.from > price.to) {
      toast.error("Price không hợp lệ");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncePriceForm, debouncePriceTo]);
  return (
    <div
      className="relative w-full min-w-[50px] py-3 px-4 border border-gray-400 flex justify-between items-center  gap-5 select-none cursor-pointer"
      onClick={() => onClick(name)}
    >
      <span className="capitalize text-gray-400 text-xs">{name}</span>
      <AiOutlineDown></AiOutlineDown>
      {activeClick === name && (
        <div className="absolute top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white z-50 min-w-[200px]">
          {type === "checkbox" && (
            <div className="">
              <div className="p-4 flex items-center justify-between">
                <span className="whitespace-nowrap text-sm text-gray-600">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                  className="underline cursor-pointer hover:text-colorMain text-sm text-gray-600"
                >
                  Reset
                </span>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                {colors?.map((color) => (
                  <div className="flex gap-2 text-sm text-gray-500" key={color}>
                    <input
                      type="checkbox"
                      value={color}
                      id={color}
                      onChange={handleSelectColor}
                      checked={selected.some((selectColor) => selectColor === color)}
                    />
                    <label className="capitalize" htmlFor={color}>
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-4 flex items-center justify-between">
                <span className="whitespace-nowrap text-sm text-gray-600">{`The highest price is ${formatMoney(
                  bestPrice
                )} VND `}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({
                      from: "",
                      to: "",
                    });
                    onClick(null);
                  }}
                  className="underline cursor-pointer hover:text-colorMain text-sm text-gray-600"
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="">Form</label>
                  <input
                    onChange={(e) => setPrice((prev) => ({ ...prev, from: e.target.value }))}
                    value={price.from}
                    className="border p-1 border-gray-300"
                    type="number"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="">To</label>
                  <input
                    className="border p-1 border-gray-300"
                    type="number"
                    value={price.to}
                    onChange={(e) => setPrice((prev) => ({ ...prev, to: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchItems;
