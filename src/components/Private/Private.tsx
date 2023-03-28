import React from "react";
import { useNavigate } from "react-router-dom";
import HomeRoute from "../AllRoutes/HomeRoute";
import { useAppSelector } from "../Global/Store";
import { dummy_user } from "../Global/ReduxState";

const PrivateRoutes = ({ children }: any) => {
  const user = useAppSelector((state) => state.bizClient);
  const navigate = useNavigate();

  //   if (user?.status === "Business") {
  //     navigate("/", { replace: true });
  //     return children;
  //   } else if (user?.status === "User") {
  //     navigate("/", { replace: true });
  //     return children;

  //     //   window.location.reload();
  //   }

  if (dummy_user?.role) {
    return children;
  } else {
    navigate("/", { replace: true });
    // window.location.reload();
  }
};

export default PrivateRoutes;
