import { apiCreateProduct } from "apis/product";
import { BsTrash } from "react-icons/bs";
import { Button, CustomSelect, InputField, Loading, MarkdownEditor } from "components";
import { toast } from "react-toastify";
import { toBase64 } from "utils/heplers";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "react-modal";
import React, { useEffect } from "react";

const CreateProduct = () => {
  const { categories } = useSelector((state) => state.app);
  const [preview, setPreview] = useState({
    thumbnail: null,
    images: [],
  });
  const [hoverElm, setHoverElm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, register, watch, reset } = useForm({
    mode: "onSubmit",
  });
  const [payload, setPayload] = useState({
    desc: "",
  });
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
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File not supported");
        return;
      }
      const base64 = await toBase64(file);
      imagePreview.push({ name: file.name, path: base64 });
      setPreview((prev) => ({ ...prev, images: imagePreview }));
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
  const handleRemovePreviewImage = (name) => {
    const filesWatch = [...watch("images")];
    reset({
      images: filesWatch.filter((el) => el.name !== name),
    });
    if (preview?.images?.some((el) => el.name === name)) {
      setPreview((prev) => ({ ...prev, images: prev?.images?.filter((el) => el.name !== name) }));
    }
  };
  const changeValue = (e) => {
    setPayload(e);
  };
  const onHandleAddProduct = async (values) => {
    try {
      setIsLoading(true);
      if (values?.category) {
        values.category = categories?.find((el) => el._id === values.category)?.title;
      }
      const finalPayload = { ...values, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) {
        formData.append(i[0], i[1]);
      }
      if (finalPayload?.thumbnail) formData.append("thumbnail", finalPayload?.thumbnail[0]);
      if (finalPayload?.images) {
        for (let i of finalPayload?.images) {
          formData.append("images", i);
        }
      }
      const response = await apiCreateProduct(formData);
      if (response.success) {
        reset();
        setPayload({
          thumbnail: null,
          images: [],
        });
        toast.success("Created product successfully");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to create product");
      setIsLoading(false);
      console.log("error:", error);
    }
  };
  const getBrandByCategory = categories?.find((el) => el._id === watch("category"));

  return (
    <div>
      <Modal
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
        className={"bg-none border-none outline-none select-none"}
        isOpen={isLoading}
      >
        <Loading></Loading>
      </Modal>
      <h1 className="flex items-center justify-between text-3xl font-semibold h-[75px] ">
        <span>Create Product</span>
      </h1>
      <div>
        <form onSubmit={handleSubmit(onHandleAddProduct)}>
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
              option={categories?.map((el) => ({ code: el._id, value: el.title }))}
              choose
            ></CustomSelect>
            <CustomSelect
              labelName={"Brand (Optional)"}
              className="py-3 w-full !h-[50px]"
              name={"brand"}
              register={register}
              option={getBrandByCategory?.brand?.map((el) => ({ code: el, value: el }))}
              choose
            ></CustomSelect>
          </div>
          <MarkdownEditor name="desc" changeValue={changeValue}></MarkdownEditor>
          <div className="flex flex-col mt-5">
            <label className="my-2" htmlFor="thumb">
              Upload Thumbnail
            </label>
            <input {...register("thumbnail")} type="file" id="thumb" />
            {preview?.thumbnail && (
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
            {preview?.images && (
              <div className="my-3 flex gap-5">
                {preview?.images?.map((image) => (
                  <div
                    onMouseMove={() => setHoverElm(image.name)}
                    onMouseLeave={() => setHoverElm(null)}
                    className="relative w-fit h-fit"
                  >
                    <img src={image.path} key={image} className="w-48 h-48 object-cover " alt="" />
                    {hoverElm === image.name && (
                      <div className="absolute flex items-center justify-center bg-black inset-0 bg-opacity-40 scale-up-center">
                        <BsTrash
                          size={30}
                          color="white"
                          className="cursor-pointer"
                          onClick={() => handleRemovePreviewImage(image.name)}
                        ></BsTrash>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <Button className="my-5">Add new Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
