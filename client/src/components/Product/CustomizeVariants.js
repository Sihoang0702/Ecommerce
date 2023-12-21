import { apiAddVariants } from "apis/product";
import Button from "components/Button/Button";
import InputField from "components/Input/InputField";
import Loading from "components/Loading/Loading";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toBase64 } from "utils/heplers";
import path from "utils/path";
const CustomizeVariants = ({ customizeVariants, setCustomizeVariants, reRender = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState({
    thumbnail: "",
    images: [],
  });
  const { control, handleSubmit, reset, register, watch } = useForm();
  useEffect(() => {
    reset({
      title: customizeVariants?.title || "",
      color: customizeVariants?.color || "",
      price: customizeVariants?.price || "",
    });
  }, [customizeVariants, reset]);
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
  useEffect(() => {
    if (watch("thumbnail") instanceof FileList && watch("thumbnail").length > 0) {
      handlePreviewThumb(watch("thumbnail")[0]);
    }
    if (watch("images") instanceof FileList && watch("images").length > 0) {
      handlePreviewImages(watch("images"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("thumbnail"), watch("images")]);
  const handleAddVariants = async (values) => {
    if (values.color === customizeVariants.color) {
      alert("Color not changed");
      return;
    }
    const formData = new FormData();
    for (let i of Object.entries(values)) {
      formData.append(i[0], i[1]);
    }
    if (values.thumbnail.length > 0) formData.append("thumbnail", values.thumbnail[0]);
    else return values.thumbnail;
    if (values.images) {
      for (let image of values.images) formData.append("images", image);
    }
    const response = await apiAddVariants(formData, customizeVariants._id);
    if (response.sucess) {
      reset();
      setPreview({ thumbnail: "", images: [] });
      toast.success("Add variants successfully");
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
        <div className="flex items-center justify-between font-semibold h-[75px]">
          <span className="text-3xl">Customize variants</span>
          <Button className="max-w-[120px] rounded z-50" onClick={() => setCustomizeVariants(null)}>
            Cancel
          </Button>
        </div>
        <form action="" onSubmit={handleSubmit(handleAddVariants)}>
          <div className="flex items-center gap-5">
            <InputField
              control={control}
              name={"title"}
              placeholder="Original name"
              labelName="Original name"
              className="!py-3 "
            ></InputField>
          </div>
          <div className="flex gap-5">
            <InputField
              control={control}
              name={"price"}
              placeholder="Price of new product"
              labelName="Price"
              className="!py-3"
            ></InputField>
            <InputField
              control={control}
              name={"color"}
              placeholder="Color of new product"
              labelName="Color"
              className="!py-3"
            ></InputField>
          </div>
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
          <div className="flex justify-end items-center gap-x-3">
            <Link
              to={`/admin/manage-variant/${customizeVariants?._id}/${customizeVariants?.title}`}
              className="py-2 px-4 rounded text-white bg-blue-500 hover:bg-gray-600 transition-all"
            >
              View Variant of : {customizeVariants.title}
            </Link>
            <Button className="max-w-[200px] rounded">Add Variants</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizeVariants;
