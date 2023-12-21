import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice";
// import { logger } from "redux-logger";
import productSlice from "./products/productSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "./auth/authSlice";
import globalSlice from "./slice/globalSlice";

const commonConfig = {
  key: "shop/auth",
  storage,
};
const authConfig = {
  ...commonConfig,
  whileList: ["isAuthLogin", "accessToken", "current"],
};
export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice,
    global: globalSlice,
    auth: persistReducer(authConfig, authSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
