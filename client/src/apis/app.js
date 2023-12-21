import instance from "./axios";

export const apiGetCategory = () => {
  return instance({
    url: "product-category",
    method: "GET",
  });
};
