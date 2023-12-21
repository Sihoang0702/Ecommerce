import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { Breadcrumbs, Pagination, ProductCard, SearchItems, SortBySelect } from "components";
import { apiGetProducts } from "apis/product";
import { sorts } from "utils/constans";

const ProductPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [activeClick, setActiveClick] = useState(null);
  const [sort, setSort] = useState(null);
  const [params] = useSearchParams();

  useEffect(() => {
    const queries = { ...params, category };
    async function fetchProductByCategory(queries) {
      try {
        const response = await apiGetProducts(queries);
        setProducts(response);
      } catch (error) {
        console.log("error:", error);
      }
    }
    for (const i of params) {
      queries[i[0]] = i[1];
    }
    //gán gte , lte do form & to không được định nghĩa trong nodejs
    let priceQuery = {};
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [{ price: { gte: queries.from } }, { price: { lte: queries.to } }],
      };
      delete queries.price;
    }
    if (queries.from) {
      queries.price = { gte: queries.from };
    }
    if (queries.to) {
      queries.price = { lte: queries.to };
    }
    delete queries.to;
    delete queries.from;

    fetchProductByCategory({ ...priceQuery, ...queries });
  }, [params, category]);

  const handleClickActiveClick = (name) => {
    if (activeClick === name) {
      setActiveClick(null);
    } else {
      setActiveClick(name);
    }
  };
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sort]
  );
  useEffect(() => {
    if (sort) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          sort: sort,
        }).toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, sort]);
  return (
    <div>
      <div className="w-full bg-gray-200">
        <div className="flex flex-col p-3">
          <h1 className="font-medium text-lg uppercase mb-2">{category}</h1>
          <Breadcrumbs category={category}></Breadcrumbs>
        </div>
      </div>
      <div className="w-full border p-3 flex justify-between my-5">
        <div>
          <span className="text-sm font-semibold text-gray-600">Filter by</span>
          <div className="flex gap-x-2">
            <SearchItems
              onClick={() => handleClickActiveClick("Price")}
              activeClick={activeClick}
              name="Price"
              type="input"
            ></SearchItems>
            <SearchItems
              onClick={() => handleClickActiveClick("Color")}
              activeClick={activeClick}
              name="Color"
            />
          </div>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-600 ">Sort by</span>
          <div>
            <SortBySelect value={sorts} option={sorts} changeValue={changeValue}></SortBySelect>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {products?.data?.length > 0 &&
          products?.data?.map((product) => (
            <ProductCard key={product._id} data={product}></ProductCard>
          ))}
      </div>
      <div className="my-5 flex justify-center">
        <Pagination totalProduct={products.counts}></Pagination>
      </div>
    </div>
  );
};

export default ProductPage;
