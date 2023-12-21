import React, { useState } from "react";
import { Button } from "components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "apis/user";
import { toast } from "react-toastify";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (!response.success) {
      toast.error(response.mes);
    }
    toast.success(response.mes);
  };
  return (
    <div className=" slide-right absolute top-0 left-0 bottom-0 right-0 bg-white z-[9999]">
      <div className="flex flex-col w-full items-center">
        <div className="w-full max-w-[700px]">
          <label htmlFor="">Enter your new password</label>
          <input
            type="password"
            name="password"
            className="border border-gray-300 w-full p-3 rounded-md outline-none my-5"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="rounded-md w-full max-w-[100px]" onClick={handleResetPassword}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
