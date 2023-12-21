import { apiUpdateUser } from "apis/user";
import { Button, InputField, Loading } from "components";
import { getCurrentUser } from "store/auth/asyncAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import avatarDefault from "../../assets/avatar.png";
import dayjs from "dayjs";
import React from "react";
import Modal from "react-modal";
import { useState } from "react";
const Personal = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors, isDirty },
  } = useForm();
  const { current } = useSelector((state) => state.auth);
  useEffect(() => {
    reset(current);
  }, [current, reset]);
  const onUpdateProfile = async (values) => {
    try {
      const formData = new FormData();
      if (values.avatar.length > 0) {
        formData.append("avatar", values.avatar[0]);
      } else {
        delete values.avatar;
      }
      for (let i of Object.entries(values)) formData.append(i[0], i[1]);
      setIsLoading(true);
      const response = await apiUpdateUser(formData);
      if (response.success) {
        dispatch(getCurrentUser());
        toast.success("User updated successfully");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error:", error);
      toast.error(error);
    }
  };
  return (
    <div className="w-full relative">
      <header className="text-3xl font-semibold py-4 border-b border-blue-200 mb-14">
        Personal
      </header>
      <div>
        <Modal
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
          className={"bg-none border-none outline-none select-none"}
          isOpen={isLoading}
        >
          <Loading></Loading>
        </Modal>
        <form action="" onSubmit={handleSubmit(onUpdateProfile)}>
          <div className="flex gap-x-5">
            <InputField
              control={control}
              name={"firstName"}
              placeholder="Enter your first name..."
              labelName="First name"
              className="!py-3 "
            ></InputField>
            <InputField
              control={control}
              name={"lastName"}
              placeholder="Enter your last name..."
              labelName="Last name"
              className="!py-3 "
            ></InputField>
          </div>
          <div className="flex gap-x-5">
            <InputField
              control={control}
              name={"email"}
              placeholder="Enter your email address..."
              labelName="Email"
              className="!py-3 "
            ></InputField>
            <InputField
              control={control}
              name={"mobile"}
              type="number"
              placeholder="Enter your phone number..."
              labelName="Phone"
              className="!py-3 "
            ></InputField>
          </div>
          <div className="flex flex-col gap-y-4 mb-4">
            <div>
              <span className="font-semibold">Account Status : </span>
              <span>{current.isBlocked ? "Blocked" : "Active"}</span>
            </div>
            <div>
              <span className="font-semibold">Role : </span>
              <span>{current.role === 96 ? "Admin" : "User"}</span>
            </div>
            <div>
              <span className="font-semibold">Created At : </span>
              <span>{dayjs(current.createdAt).format("DD/MM/YYYY")}</span>
            </div>
            <div className="flex flex-col gap-y-3">
              <span className="font-semibold">Avatar : </span>
              <label htmlFor="file" className="cursor-pointer">
                <img
                  className="w-24 h-24 object-cover rounded-full"
                  src={current.avatar || avatarDefault}
                  alt=""
                />
                <input type="file" id="file" hidden {...register("avatar")} />
              </label>
            </div>
          </div>
          {isDirty && (
            <Button type="submit" className="rounded">
              Update Profile
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Personal;
