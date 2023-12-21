const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  PRODUCTS__CATEGORY: ":category",
  DETAIL_PRODUCT__CATEGORY__PID__SLUG: ":category/:pId/:slug",
  BLOGS: "blogs",
  OUR_SERVERS: "servers",
  FAQ: "faq",
  FINAL_REGISTER: "final-register/:status",
  RESET_PASSWORD: "rest-password/:token",
  DETAIL_CART: "my-cart",
  //admin
  ADMIN: "admin",
  DASHBOARD: "",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCT: "manage-product",
  MANAGE_VARIANT: "manage-variant/:pid",
  MANAGE_ORDER: "manage-order",
  CREATE_PRODUCT: "create-product",

  //member
  MEMBER: "member",
  PERSONAL: "personal",
  MY_CART: "my-cart",
  HISTORY: "buy-history",
  WISHLIST: "wish-list",
};
export default path;
