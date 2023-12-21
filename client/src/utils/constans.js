import path from "../utils/path";
import icons from "./icon";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
export const navigation = [
  {
    id: 5,
    value: "Home",
    path: `/${path.HOME}`,
  },
  {
    id: 1,
    value: "Product",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 2,
    value: "Blog",
    path: `/${path.BLOGS}`,
  },
  {
    id: 3,
    value: "OUR Services",
    path: `/${path.OUR_SERVERS}`,
  },
  {
    id: 4,
    value: "FAQs",
    path: `/${path.FAQ}`,
  },
];
export const productInformationTabs = [
  {
    id: 1,
    name: "Description",
    content: `
    It's been a while since we met the last of the Mi kind. Even though the Xiaomi Mi 4 went on sale back in the summer of 2014, it succeeded in staying relevant for over 20 months and surpassed the lifespan of many competitors. Xiaomi surely took the time to make the Mi 5 worthy of the flagship series name.
    The Mi 5 was the first Xiaomi phone to be unveiled under the massive spotlight of the world's biggest mobile expo - the MWC in Barcelona. And with its stunning looks and capable performance, the Mi 5 deserved nothing less.
    The Xiaomi Mi 5 is instantly likeable - the new flagship comes with unbelievably thin bezels, a sharp profile, a curved back and a lightweight body - all adding to one of the most impressive exteriors a modern smartphones can hope for.
    Then you learn that inside there is the latest Snapdragon 820 chicest, a new 16MP camera with 4-axis optical stabilization and yet no camera hump, generous storage options, rich connectivity options, and a beefy battery. How about that?
    `,
  },
  {
    id: 2,
    name: "WARRANTY",
    content: `WARRANTY INFORMATION
    LIMITED WARRANTIES
    Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
    Frames Used In Upholstered and Leather Products
    Limited Lifetime Warranty
    A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
  },
  {
    id: 3,
    name: "DELIVERY",
    content: `PURCHASING & DELIVERY
    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
  },
  {
    id: 4,
    name: "PAYMENT",
    content: `PURCHASING & DELIVERY
    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
`,
  },
];

export const colors = [
  "black",
  "brown",
  "gray",
  "white",
  "pink",
  "yellow",
  "orange",
  "purple",
  "green",
  "blue",
];
export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Best Selling",
  },
  {
    id: 2,
    value: "title",
    text: "Alphabetical , A - Z",
  },
  {
    id: 3,
    value: "-title",
    text: "Alphabetical , Z - A",
  },
  {
    id: 4,
    value: "-price",
    text: "High to low",
  },
  {
    id: 5,
    value: "price",
    text: "Low to high",
  },
  {
    id: 6,
    value: "-createdAt",
    text: "Date , new to old",
  },
  {
    id: 7,
    value: "createdAt",
    text: "Date , old to new",
  },
];
export const voteList = [
  { id: 1, text: "Very bad" },
  { id: 2, text: "Bad" },
  { id: 3, text: "Normal" },
  { id: 4, text: "Good" },
  { id: 5, text: "Perfect" },
];
const { AiOutlineDashboard, RiGroupLine, RiBillLine, TbBrandProducthunt } = icons;
export const adminSidebar = [
  {
    id: 1,
    type: "Single",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard></AiOutlineDashboard>,
  },
  {
    id: 2,
    type: "Single",
    text: "Manage user",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <RiGroupLine></RiGroupLine>,
  },
  {
    id: 3,
    type: "parent",
    text: "Product",
    submenu: [
      {
        text: "Manage Product",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCT}`,
      },
      {
        text: "Create product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
      },
    ],
    icon: <TbBrandProducthunt></TbBrandProducthunt>,
  },
  {
    id: 4,
    type: "Single",
    text: "Order",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillLine></RiBillLine>,
  },
];
export const memberSidebar = [
  {
    id: 1,
    type: "Single",
    text: "Personal",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <CiUser />,
  },
  {
    id: 2,
    type: "Single",
    text: "My cart",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <CiShoppingCart />,
  },
  {
    id: 3,
    type: "Single",
    text: "Wish list",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <CiHeart />,
  },
  {
    id: 4,
    type: "Single",
    text: "History",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <RiBillLine />,
  },
];
export const role = [
  {
    code: 96,
    value: "Admin",
  },
  {
    code: 69,
    value: "User",
  },
];
export const statusUser = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];