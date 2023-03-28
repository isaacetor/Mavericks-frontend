import React from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import styled from "styled-components";

import { TbArrowsLeftRight } from "react-icons/tb";
import SideNav from "../DashBoards/Business/SideNav/Nav.Business";
import BusinessHome from "../DashBoards/Business/Pages/Home.Business";
import BusinessCard from "../DashBoards/Business/Pages/GiftCards";
import BusinessWallet from "../DashBoards/Business/Pages/Wallet.Business";
import BusinessNotify from "../DashBoards/Business/Pages/Notify.Business";
import BusinessSupport from "../DashBoards/Business/Pages/Support.Business";
import BusinessAccount from "../DashBoards/Business/Pages/Account.Business";
import MobileNavs from "../DashBoards/Business/SideNav/Mobile.Nav";
import BusinessMobileNavs from "../DashBoards/Business/SideNav/Mobile.Nav";
import { useAppSelector } from "../Global/Store";
import PayOut from "../DashBoards/Business/Pages/Payment";

const BusinessRoutes = () => {
  const [showing, setShowing] = React.useState(false);
  const user = useAppSelector((state) => state.bizClient);

  let element = useRoutes([
    {
      path: "/dashboard",
      element: <BusinessHome />,
    },
    {
      path: "/dashboard/giftcard",
      element: <BusinessCard />,
    },
    {
      path: "/dashboard/wallet",
      element: <BusinessWallet />,
    },
    {
      path: "/dashboard/notify",
      element: <BusinessNotify />,
    },
    {
      path: "/dashboard/support",
      element: <BusinessSupport />,
    },
    {
      path: "/dashboard/account",
      element: <BusinessAccount />,
    },
    {
      path: "/pay-out/:id",
      element: <PayOut />,
    },
  ]);
  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <WrapHead>
        <SideNav />
        {/* {user?.status === "Business" ? <SideNav /> : null} */}
      </WrapHead>
      <Wrapper>{element}</Wrapper>
      <Shower
        onClick={() => {
          setShowing(!showing);
        }}
      >
        <TbArrowsLeftRight />
      </Shower>
      {showing ? <BusinessMobileNavs /> : null}
    </div>
  );
};

export default BusinessRoutes;
const WrapHead = styled.div`
  width: 250px;
  height: 100vh;
  display: block;
  @media screen and (min-width: 801px) and (max-width: 1051px) {
    width: 60px;
    height: 100vh;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
const Wrapper = styled.div`
  width: calc(100vw - 250px);
  height: 100vh;
  display: flex;
  /* overflow: hidden; */
  @media screen and (min-width: 801px) and (max-width: 1051px) {
    width: calc(100% - 60px);
    height: 100vh;
  }
  @media screen and (max-width: 800px) {
    width: 100vw;
  }
`;
const Shower = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
  display: flex;
  z-index: 10;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  font-weight: 200;
  color: purple;
  background-color: white;
  @media screen and (min-width: 800px) {
    display: none;
  }
`;
