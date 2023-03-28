import React from "react";
import HomeRoute from "./components/AllRoutes/HomeRoute";
import BusinessRoutes from "./components/AllRoutes/BusinessRoute";
import UserRoutes from "./components/AllRoutes/UserRoutes";
import { useAppSelector } from "./components/Global/Store";

function App() {
  const business = useAppSelector((state) => state.bizClient);
  const user = useAppSelector((state) => state.userData);

  // console.log(business?.status);
  return (
    <div>
      <HomeRoute />

      {/* <BusinessRoutes />
      <UserRoutes /> */}
      {business?.name ? <BusinessRoutes /> : null}
      {user?.name ? <UserRoutes /> : null}

      {/* <PrivateRoutes> */}
      {/* {business?.status === "Business" ? <BusinessRoutes /> : null} */}
      {/* </PrivateRoutes> */}

      {/* <PrivateRoutes>
        {user?.status === "User" ? <UserRoutes /> : null}
      </PrivateRoutes> */}

      {/* <PrivateRoutes> */}
      {/* {dummy_user.role === "" ? <BusinessRoutes /> : <UserRoutes />} */}
      {/* </PrivateRoutes> */}
    </div>
  );
}

export default App;
