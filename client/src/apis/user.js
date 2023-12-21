import instance from "./axios";

export const apiRegister = (data) => {
  return instance.post("user/register", data, {
    withCredentials: true, //để gửi thông tin xác thực và cookie kèm theo yêu cầu.
  });
};

export const apiLogin = (data) => {
  return instance.post("user/login", data);
};
export const apiForgotPassword = (data) => {
  return instance.post("user/forgot-password", data);
};
export const apiResetPassword = (data) => {
  return instance.put("user/reset-password", data);
};
export const apiGetCurrentUser = () => {
  return instance.get("user/current");
};
export const apiUpdateUserByAdmin = (data) => {
  return instance.put(`user/${data.id}`, data);
};
export const apiDeleteUser = (uid) => {
  return instance.delete(`user/${uid}`);
};
export const apiUpdateUser = (data) => {
  return instance.put("user/current", data);
};
export const apiUpdateCart = (data) => {
  return instance.put("user/cart", data);
};
export const apiDeleteCart = (pid, color) => {
  return instance.delete(`user/remove-cart/${pid}/${color}`);
};
export const apiGetAllUsers = (params) => {
  return instance({
    url: "user",
    method: "GET",
    params,
  });
};
