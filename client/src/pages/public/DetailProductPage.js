import { AiFillGift, AiOutlineStar } from "react-icons/ai";
import { apiGetProduct, apiGetProducts } from "apis/product";
import { BiSolidTruck } from "react-icons/bi";
import { BsFillReplyFill, BsShieldShaded } from "react-icons/bs";
import { CustomSlider, ProductInformation, SelectQuantity } from "components";
import { FaTty } from "react-icons/fa";
import { formatMoney, renderStartNumber } from "utils/heplers";
import { createSearchParams, useLocation, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";
import Button from "components/Button/Button";
import Productextrainfo from "components/Product/Productextrainfo";
import React, { useCallback, useEffect, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import Slider from "react-slick";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getCurrentUser } from "store/auth/asyncAction";
import { apiUpdateCart } from "apis/user";
import path from "utils/path";
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const DetailProductPage = () => {
  let productData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pId, category } = useParams();
  const { current } = useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [variant, setVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    thumbnail: "",
    images: [],
    price: "",
  });
  const handleQuantity = useCallback((number) => {
    if (!Number(number) || number < 1 || number > 10) {
      return;
    } else {
      setQuantity(+number);
    }
  }, []);
  const handleIncrement = useCallback(() => {
    if (quantity >= 10) return;
    setQuantity((prev) => +prev + 1);
  }, [quantity]);

  const handleDecrement = useCallback(() => {
    if (quantity < 1) return;
    setQuantity((prev) => +prev - 1);
  }, [quantity]);
  useEffect(() => {
    if (variant) {
      setCurrentProduct({
        title: product.variants?.find((el) => el.sku === variant)?.title || product.title,
        thumbnail:
          product.variants?.find((el) => el.sku === variant)?.thumbnail || product.thumbnail,
        images: product.variants?.find((el) => el.sku === variant)?.images || product.images,
        price: product.variants?.find((el) => el.sku === variant)?.price || product.price,
        color: product.variants?.find((el) => el.sku === variant)?.color || product.color,
      });
    } else {
      setCurrentProduct({
        title: product.title,
        thumbnail: product.thumbnail,
        images: product.images,
        price: product.price,
      });
    }
  }, [
    product.color,
    product.images,
    product.price,
    product.thumbnail,
    product.title,
    product.variants,
    variant,
  ]);
  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const response = await apiGetProduct(pId);
        if (response.success) {
          setProduct(response.data);
          setCurrentImage(response?.data?.images[0]);
        }
      } catch (error) {
        console.log("error:", error);
      }
    }
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
    fetchProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pId]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await apiGetProducts({ category: category });
        setProducts(response.data);
      } catch (error) {
        console.log("error:", error);
      }
    }
    fetchProducts();
  }, [category]);
  const props = {
    width: 500,
    height: 500,
    zoomWidth: 450,
    img: currentImage || "https://source.unsplash.com/random",
  };
  const handleClickImage = (e, image) => {
    e.stopPropagation();
    setCurrentImage(image);
  };
  const handleAddToCart = async () => {
    if (!current) {
      return Swal.fire({
        title: "Almost",
        text: "Please login",
        icon: "info",
        cancelButtonText: "Not now",
        showCancelButton: true,
        confirmButtonText: "Go Login",
      }).then(async (rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({ redirect: location.pathname }).toString(),
          });
      });
    }
    try {
      const response = await apiGetProduct(product._id);
      if (response?.success) {
        productData = response?.data;
        const cart = await apiUpdateCart({
          pid: pId,
          color: currentProduct?.color || product.color,
          title: currentProduct?.title || product.title,
          quantity,
          price: currentProduct?.price || product?.price,
          thumbnail: currentProduct?.thumbnail || product?.thumbnail,
        });
        if (cart?.success) {
          toast.success("Đã thêm vào giỏ hàng");
          dispatch(getCurrentUser());
        }
      }
    } catch (error) {
      toast.info(error);
      console.log("error:", error);
    }
  };
  return (
    <div className="relative">
      <div className="w-full bg-gray-200">
        <div className="flex flex-col p-3">
          <h1 className="font-medium text-lg uppercase mb-2">
            {currentProduct.title || product.title}
          </h1>
          <Breadcrumbs title={product?.title} category={category}></Breadcrumbs>
        </div>
      </div>
      <section className="w-full mt-5">
        <div className="gap-4 grid grid-cols-3">
          <div className="w-full max-w-[480px] max-h-[680px] flex flex-col gap-y-3 flex-1">
            <div className="border custom-zoom">
              <ReactImageZoom {...props} />
            </div>
            <div className="h-full max-h-[143px]">
              <Slider className="image-slider" {...settings}>
                {currentProduct?.images?.map((image, index) => (
                  <div className="px-1" key={index + 1}>
                    <img
                      className="w-full max-w-[143px] h-[126px] object-contain border"
                      src={image}
                      onClick={(e) => handleClickImage(e, image)}
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-full max-w-[422px] flex flex-col gap-y-4">
            <div className="flex flex-col">
              <h3 className="font-semibold text-2xl">
                {formatMoney(currentProduct?.price || product?.price)}
              </h3>
              <span className="text-sm text-colorMain mt-3 font-semibold">
                Quantity : {product?.quantity || 0}
              </span>
            </div>
            <div className="flex gap-x-2 items-center">
              <span className="flex ">
                {renderStartNumber(product?.totalRatings) ||
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <AiOutlineStar className="text-yellow-400" key={index + 2}></AiOutlineStar>
                    ))}
              </span>
              <span className="italic text-sm text-colorMain ">Sold : {product?.sold || 0}</span>
            </div>
            <ul className="ml-4">
              {product?.desc?.length > 1 &&
                product?.desc?.map((el) => (
                  <li key={el} className="text-sm text-gray-500 leading-6 list-[square]">
                    {el}
                  </li>
                ))}
              {product?.desc?.length === 1 &&
                product?.desc?.map((el) => (
                  <div
                    key={el}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(el) }}
                    className="text-sm text-gray-500 line-clamp-[20] "
                  ></div>
                ))}
            </ul>
            <span className="font-semibold">Color : </span>
            <div className="flex items-center gap-x-3 rounded">
              <div
                onClick={() => setVariant(null)}
                className={clsx(
                  "border flex justify-center p-2",
                  !variant && "border-red-500 border-2"
                )}
              >
                <img className="w-16 h-12 object-contain" src={product?.thumbnail} alt="" />
                <div>
                  <span className="text-center text-sm ">{product.color}</span>
                </div>
              </div>
              {product?.variants?.map((el) => (
                <div
                  onClick={() => setVariant(el.sku)}
                  className={clsx(
                    "border flex justify-center p-2 cursor-pointer",
                    variant === el.sku && "border-red-500 border-2"
                  )}
                >
                  <img className="w-16 h-12 object-contain" src={el?.thumbnail} alt="" />
                  <div>
                    <span className="text-center text-sm ">{el.color}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-x-5">
              <span className="font-semibold text-sm">Quantity</span>
              <SelectQuantity
                handleQuantity={handleQuantity}
                quantity={quantity}
                decrement={handleDecrement}
                increment={handleIncrement}
              ></SelectQuantity>
            </div>
            <Button onClick={handleAddToCart}>ADD TO CART</Button>
          </div>
          <div className="flex flex-col gap-y-3">
            <Productextrainfo
              icon={<BsShieldShaded />}
              textMain={"Guarantee"}
              desc="Quality Checked"
            />
            <Productextrainfo
              icon={<BiSolidTruck />}
              textMain={"Free Shipping"}
              desc="Free On All Products"
            />
            <Productextrainfo
              icon={<AiFillGift />}
              textMain={"Special Gift Cards"}
              desc="Special Gift Cards"
            />
            <Productextrainfo
              icon={<BsFillReplyFill />}
              textMain={"Free Return"}
              desc="Within 7 Days"
            />
            <Productextrainfo icon={<FaTty />} textMain={"Consultancy"} desc="Lifetime 24/7/356" />
          </div>
        </div>
        <div className="mt-10">
          <ProductInformation
            totalRatings={Number(product?.totalRatings)}
            ratings={product?.ratings}
            nameProduct={product?.title}
            pid={product?._id}
          ></ProductInformation>
        </div>
        <h3 className="font-semibold py-3 text-xl uppercase border-b-2 border-colorMain mb-5">
          OTHER CUSTOMERS ALSO BUY:
        </h3>
        {products && <CustomSlider isShowNew={false} products={products} />}
      </section>
    </div>
  );
};

export default DetailProductPage;
