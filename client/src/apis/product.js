import instance from "./axios";

export const apiGetProducts = (params) => {
  return instance({
    url: "/product",
    method: "GET",
    params,
  });
};

export const apiGetProduct = (pId) => {
  return instance.get(`/product/${pId}`);
};
export const apiRatings = (data) => {
  return instance.put(`/product/ratings`, data);
};
export const apiCreateProduct = (data) => {
  return instance.post(`/product/`, data);
};
export const apiUpdateProduct = (product, pid) => {
  return instance.put(`/product/${pid}`, product);
};
export const apiDeleteProduct = (pid) => {
  return instance.delete(`/product/${pid}`);
};
export const apiAddVariants = (data, pid) => {
  return instance.put(`/product/variants/${pid}`, data);
};
export const apiGetVariants = (pid) => {
  return instance.get(`product/get-variants/${pid}`);
};
export const apiDeleteVariants = (pid, variantId) => {
  return instance.delete(`product/variants/${pid}/${variantId}`);
};
export const apiUpdateVariant = (product, pid, variantId) => {
  return instance.put(`product/update-variants/${pid}/${variantId}`, product);
};
