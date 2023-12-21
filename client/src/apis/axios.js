import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
});

instance.interceptors.request.use(
  function (config) {
    const data = JSON.parse(localStorage.getItem("persist:shop/auth")) || {};
    if (data) {
      const accessToken = data?.accessToken;
      config.headers = {
        Authorization: `Bearer ${accessToken.replace(/"/g, "")}`,
      };
      return config;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function ({ data }) {
    return data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
