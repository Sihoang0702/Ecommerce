import React, { useCallback, useDeferredValue, useEffect, useState } from "react";
import { apiDeleteUser, apiGetAllUsers, apiUpdateUserByAdmin } from "apis/user";
import { role, statusUser } from "utils/constans";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button, CustomSelect, Input, Pagination } from "components";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
dayjs.extend(relativeTime);
const ManageUser = () => {
  const [users, setUser] = useState([]);
  const [value, setValue] = useState("");
  const defferValue = useDeferredValue(value);
  const [editUser, setEditUser] = useState(null);
  const [render, setRender] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [params] = useSearchParams();
  const { register, handleSubmit, reset } = useForm({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    role: 69,
    isBlocked: false,
  });
  useEffect(() => {
    async function fetchUsers() {
      //lấy query trên params
      const queries = Object.fromEntries([...params]);
      const limit = { limit: 3 };
      try {
        if (defferValue !== "") {
          const response = await apiGetAllUsers({ q: defferValue, ...queries, ...limit });
          setUser(response);
        } else {
          const response = await apiGetAllUsers({ ...queries, ...limit });
          setUser(response);
        }
      } catch (error) {
        console.log("error:", error);
      }
    }
    fetchUsers();
  }, [params, defferValue, render]);
  const reRender = useCallback(() => {
    setRender(!render);
  }, [render]);
  const onHandleUpdateUser = async (values) => {
    try {
      if (isSubmit) {
        await apiUpdateUserByAdmin({
          ...values,
          id: editUser._id,
        });
        setEditUser(null);
        reRender();
        toast.success("Updated user successfully");
        setIsSubmit(false);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const handleDeleteUser = (uid) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          await apiDeleteUser(uid);
          alert("Deleted user successfully");
          reRender();
        }
      });
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    if (editUser) reset(editUser);
  }, [editUser, reset]);
  return (
    <div>
      <h1 className="flex items-center justify-between text-3xl font-semibold h-[75px] ">
        <span>Manage user</span>
      </h1>
      <div className="w-full">
        <div className=" flex justify-end">
          <input
            name={"name"}
            className="!py-2 px-4 mb-4 rounded w-[350px] !outline-none focus:none"
            placeholder="Search ..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
        </div>
        <form onSubmit={handleSubmit(onHandleUpdateUser)}>
          {editUser && (
            <div className="flex gap-2 mb-4 w-[200px]">
              <Button onClick={() => setIsSubmit(!isSubmit)} className="w-[140px] rounded">
                Update
              </Button>
              <Button onClick={() => setEditUser(null)} className="!w-[100px] bg-zinc-500 rounded">
                Cannel
              </Button>
            </div>
          )}
          <table className="table-auto text-left w-full min-h-[50px]">
            <thead className="font-bold bg-gray-700 text-white text-base border border-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Email address</th>
                <th className="px-4 py-2">First name</th>
                <th className="px-4 py-2">Last name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {users?.data &&
                users?.data?.map((user, index) => (
                  <tr key={user?._id} className="border border-gray-500">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      {editUser?._id === user?._id ? (
                        <Input register={register} name={"email"}></Input>
                      ) : (
                        user?.email
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editUser?._id === user?._id ? (
                        <Input register={register} name={"firstName"}></Input>
                      ) : (
                        user?.firstName
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editUser?._id === user?._id ? (
                        <Input register={register} name={"lastName"}></Input>
                      ) : (
                        user?.lastName
                      )}
                    </td>

                    <td className="py-2 px-4">
                      {editUser?._id === user?._id ? (
                        <CustomSelect register={register} name="role" option={role}></CustomSelect>
                      ) : (
                        role.find((el) => el.code === user?.role)?.value
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editUser?._id === user?._id ? (
                        <Input register={register} name={"mobile"}></Input>
                      ) : (
                        user?.mobile
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editUser?._id === user?._id ? (
                        <CustomSelect
                          register={register}
                          name={"isBlocked"}
                          option={statusUser}
                        ></CustomSelect>
                      ) : user?.isBlocked ? (
                        "Block"
                      ) : (
                        "Active"
                      )}
                    </td>
                    <td className="py-2 px-4">{dayjs(user?.createdAt).format("DD/MM/YYYY")}</td>
                    <td className="py-2 px-4 ">
                      <div className="flex items-center gap-2">
                        <button
                          className="inline-flex items-center w-[75px] justify-center p-5 font-sans font-semibold tracking-wide text-white bg-blue-500 h-[25px] "
                          onClick={() => setEditUser(user)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user?._id)}
                          className="inline-flex w-[75px] items-center justify-center p-5 font-sans font-semibold tracking-wide text-white bg-red-500 h-[25px]"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </form>
        <div className="flex justify-center pt-7">
          <Pagination totalProduct={+users?.counts} pageSize={3}></Pagination>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
