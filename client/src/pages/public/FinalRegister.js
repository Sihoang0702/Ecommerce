import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import path from "utils/path";
import Swal from "sweetalert2";
const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "failed") {
      Swal.fire("Opps!", "Register failed", "error");
      navigate(`/${path.LOGIN}`);
    }
    if (status === "success") {
      Swal.fire("Sucess!", "Register success", "success");
      navigate(`/${path.LOGIN}`);
    }
  }, [navigate, status]);
  return <></>;
};

export default FinalRegister;
