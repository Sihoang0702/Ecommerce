import icons from "./icon";

const { AiFillStar, AiOutlineStar } = icons;
export const createSlug = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
};

export const formatMoney = (string = 0) => {
  return string.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const renderStartNumber = (number, size) => {
  if (!number || typeof number === "string") return;
  const star = [];
  number = Math.round(number);
  for (let i = 0; i < number; i++) {
    star.push(<AiFillStar key={i + 1} color="orange" size={size || 16}></AiFillStar>);
  }
  for (let i = 5; i > number; i--) {
    star.push(<AiOutlineStar key={i + 1} color="orange" size={size || 16}></AiOutlineStar>);
  }
  return star;
};
export const secondsToHms = (d) => {
  if (!d) return null;
  d = Number(d) / 1000;
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return { h, m, s };
};
export const formatPrice = (number) => {
  return Math.round(number / 1000) * 1000;
};

export const generateRange = (start, end) => {
  //input [3,6] , output [3,4,5,6]
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
};

export function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
