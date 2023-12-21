import { apiLogin, apiRegister, apiForgotPassword } from "apis/user";
import { Button, InputField, Loading } from "components";
import { Link, useNavigate } from "react-router-dom";
import { login } from "store/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "react-modal";
import path from "utils/path";
import React, { useState } from "react";
import Swal from "sweetalert2";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });
  const registerSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    mobile: yup
      .string()
      .required()
      .matches(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, {
        message: "Invalid phone number",
      }),
    email: yup.string().required().email(),
    password: yup.string().required(),
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isLogin ? schema : registerSchema),
    mode: "onSubmit",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = async (values) => {
    const { firstName, lastName, mobile, ...value } = values;
    //đăng nhập
    if (isLogin) {
      try {
        setIsLoading(false);
        const response = await apiLogin(value);
        Swal.fire("Đăng nhập thành công", response.mes, "success");
        dispatch(
          login({
            isAuthLogin: true,
            accessToken: response?.accessToken,
          })
        );
        reset();
        setIsLoading(false);
        navigate(`/${path.HOME}`);
      } catch (error) {
        setIsLoading(false);
        Swal.fire("Có biến rồi đại vương ơi !!", "Oops!", "error");
      }
    } else if (!isLogin) {
      try {
        setIsLoading(true);
        const response = await apiRegister(values);
        Swal.fire("Đăng ký thành cung", response.mes, "success");
        reset();
        setIsLogin(true);
        setIsLoading(false);
      } catch (error) {
        Swal.fire("Có biến rồi đại vương ơi !!", "Oops!", "error");
        setIsLoading(false);
      }
    }
  };
  const handleForgotpassword = async () => {
    try {
      const response = await apiForgotPassword({ email });
      if (response.success) {
        toast.success(response.mes);
      }
      toast.info(response.mes);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="w-full h-screen relative">
      <Modal
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
        className={"bg-none border-none outline-none select-none"}
        isOpen={isLoading}
      >
        <Loading></Loading>
      </Modal>
      {isForgotPassword && (
        <div className=" slide-right absolute top-0 left-0 bottom-0 right-0 bg-white z-[9999]">
          <div className="flex flex-col w-full items-center">
            <div className="w-full max-w-[700px]">
              <label htmlFor="">Enter your email</label>
              <input
                type="text"
                name="email"
                className="border border-gray-300 w-full p-3 rounded-md outline-none my-5"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="rounded-md w-full max-w-[100px]" onClick={handleForgotpassword}>
                Next
              </Button>
              <Button
                className="rounded-md w-full max-w-[100px] ml-5 bg-slate-500"
                onClick={() => setIsForgotPassword(false)}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      )}
      <img
        src="https://images.unsplash.com/photo-1519219788971-8d9797e0928e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2044&q=80"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute top-1/2 -translate-y-1/2 z-50 left-1/2  -translate-x-1/2 w-full max-w-[550px] ">
        <div className="bg-white p-8 rounded-lg">
          <h1 className="text-center uppercase font-semibold text-xl mb-6">
            {isLogin ? "Login" : "Register"}
          </h1>
          <form onSubmit={handleSubmit(handleOnSubmit)} className="mb-6">
            {!isLogin && (
              <>
                <InputField
                  name={"firstName"}
                  control={control}
                  placeholder="First Name"
                  error={errors?.firstName?.message}
                ></InputField>

                <InputField
                  name={"lastName"}
                  control={control}
                  placeholder="Last Name"
                  error={errors?.lastName?.message}
                ></InputField>
                <InputField
                  control={control}
                  name={"mobile"}
                  placeholder="Mobile"
                  error={errors?.mobile?.message}
                ></InputField>
              </>
            )}
            <InputField
              control={control}
              name={"email"}
              placeholder="Email"
              error={errors?.email?.message}
            ></InputField>

            <InputField
              name={"password"}
              control={control}
              type={"password"}
              placeholder="Password"
              error={errors?.password?.message}
            ></InputField>

            <Button type="submit" className="rounded-md">
              {isLogin ? "SIGN IN" : "SIGN UP"}
            </Button>
          </form>
          <div className="flex justify-between transition-all">
            <button onClick={() => setIsForgotPassword(true)} className="hover:text-colorMain">
              Forgot your password ?
            </button>
            <Link to={`${path.PUBLIC}`}>Go home</Link>
            <button onClick={() => setIsLogin(!isLogin)} className="hover:text-colorMain">
              {isLogin ? "Create Account " : "Already have an account ?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
