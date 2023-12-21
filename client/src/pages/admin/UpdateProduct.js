import { apiUpdateProduct } from "apis/product";
import { Button, CustomSelect, InputField, Loading, MarkdownEditor } from "components";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toBase64 } from "utils/heplers";
import Modal from "react-modal";
const UpdateProduct = ({ editProduct = null, reRender = () => {} }) => {
  const [payload, setPayload] = useState({
    desc: "",
  });
  const { categories } = useSelector((state) => state.app);
  const { watch, control, handleSubmit, reset, register } = useForm({});
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState({
    thumbnail: null,
    images: [],
  });

  useEffect(() => {
    if (editProduct) {
      reset({
        ...editProduct,
        brand: editProduct?.brand?.toLowerCase() || "",
      });
      setPayload({
        desc:
          typeof editProduct?.desc === "object" ? editProduct.desc?.join(" , ") : editProduct.desc,
      });
      setPreview({
        images: editProduct?.images || [],
        thumbnail: editProduct?.thumbnail || "",
      });
    }
  }, [editProduct, reset]);

  const handlePreviewThumb = async (file) => {
    try {
      const base64Thumb = await toBase64(file);
      setPreview((prev) => ({ ...prev, thumbnail: base64Thumb }));
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handlePreviewImages = async (files) => {
    const imagePreview = [];
    try {
      for (let file of files) {
        if (file.type !== "image/png" && file.type !== "image/jpeg") {
          toast.warning("File not supported");
          return;
        }
        const base64 = await toBase64(file);
        imagePreview.push(base64);
      }
      setPreview((prev) => ({ ...prev, images: imagePreview }));
    } catch (error) {
      console.log("error:", error);
    }
  };

  const changeValue = (e) => {
    setPayload(e);
  };

  useEffect(() => {
    if (watch("thumbnail") instanceof FileList && watch("thumbnail").length > 0) {
      handlePreviewThumb(watch("thumbnail")[0]);
    }
    if (watch("images") instanceof FileList && watch("images").length > 0) {
      handlePreviewImages(watch("images"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);
  
  const onHandleEditProduct = async (values) => {
    try {
      setIsLoading(true);
      if (values?.category)
        values.category = categories?.find((el) => el.title === values.category)?.title;
      const finalPayload = { ...values, ...payload };
      finalPayload.thumbnail =
        values.thumbnail?.length === 0 ? preview.thumbnail : values?.thumbnail[0];
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) {
        formData.append(i[0], i[1]);
      }
      finalPayload.images = finalPayload?.images?.length === 0 ? preview.images : values.images;
      for (const image of finalPayload.images) {
        formData.append("images", image);
      }
      await apiUpdateProduct(formData, editProduct._id);
      toast.success("Updated product successfully");
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to update product");
      setIsLoading(false);
      console.log("error:", error);
    }
  };
  return (
    <div>
      <div className="w-full bg-white">
        <Modal
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
          className={"bg-none border-none outline-none select-none"}
          isOpen={isLoading}
        >
          <Loading></Loading>
        </Modal>
        <h1 className="flex items-center justify-between text-3xl font-semibold h-[75px] ">
          <span>Update Product</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit(onHandleEditProduct)}>
        <InputField
          control={control}
          name={"title"}
          placeholder="Title"
          labelName="Title Product"
          className="!py-3"
        ></InputField>
        <div className="flex gap-3">
          <InputField
            control={control}
            name={"quantity"}
            placeholder="quantity"
            labelName="Quantity Product"
            className="!py-3"
          ></InputField>
          <InputField
            control={control}
            name={"price"}
            placeholder="Price"
            labelName="Price Product"
            className="!py-3"
          ></InputField>
          <InputField
            control={control}
            name={"color"}
            placeholder="Color"
            labelName="Color Product"
            className="!py-3"
          ></InputField>
        </div>
        <div className="flex gap-2">
          <CustomSelect
            labelName={"Category"}
            className="py-3 w-full !h-[45px]"
            name={"category"}
            register={register}
            option={categories?.map((el) => ({ code: el.title, value: el.title }))}
            choose
          ></CustomSelect>
          <CustomSelect
            labelName={"Brand (Optional)"}
            defaultValue={editProduct?.brand}
            className="py-3 w-full !h-[50px]"
            name={"brand"}
            register={register}
            option={categories
              ?.find((el) => el.title === watch("category"))
              ?.brand?.map((el) => ({ code: el?.toLowerCase(), value: el }))}
            choose
          ></CustomSelect>
        </div>
        <MarkdownEditor name="desc" changeValue={changeValue} value={payload.desc}></MarkdownEditor>
        <div className="flex flex-col mt-5">
          <label className="my-2" htmlFor="thumb">
            Upload Thumbnail
          </label>
          <input {...register("thumbnail")} type="file" id="thumb" />
          {preview.thumbnail && (
            <div className="my-3 ">
              <img className="w-[200px] h-[200px] object-cover" src={preview.thumbnail} alt="" />
            </div>
          )}
        </div>
        <div className="flex flex-col mt-5">
          <label className="my-2" htmlFor="thumb">
            Upload Images Products
          </label>
          <input {...register("images")} type="file" multiple id="images" />
          {preview.images && (
            <div className="my-3 flex gap-5">
              {preview.images?.map((image) => {
                return (
                  <div className="relative w-fit h-fit">
                    <img src={image} key={image} className="w-48 h-48 object-cover " alt="" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <Button className="my-5">Update Product</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
