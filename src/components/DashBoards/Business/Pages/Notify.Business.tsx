import React from "react";
import styled from "styled-components";
import { AiFillMessage } from "react-icons/ai";
import pic from "../../../Images/noti.svg";
import NotifyContents from "../Props/Notify.Contents";
import { useAppSelector } from "../../../Global/Store";

const BusinessNotify = () => {
  const dummy_notify: any = [{}];
  const business = useAppSelector((state) => state.bizClient);
  console.log("client", business);
  return (
    <Container>
      <Head>
        <Hold>
          <h2>Notifications</h2>
        </Hold>
      </Head>
      <Body>
        {dummy_notify.length > 0 ? (
          <NotifyContents />
        ) : (
          <Nothing>
            <CenterHold>
              <Pic>
                <img src={pic} />
              </Pic>
              <Txt>Whoops! No Activity</Txt>
              <Sxt>You’ll get new notifications soon.</Sxt>
            </CenterHold>
          </Nothing>
        )}
      </Body>
    </Container>
  );
};

export default BusinessNotify;

const Container = styled.div`
  width: 100vw;
  overflow: hidden;
  @media screen and (min-width: 801px) and (max-width: 1051px) {
    width: calc(100vw - 60px);
    height: 100vh;
  }
  @media screen and (max-width: 800px) {
    width: 100vw;
  }
`;
const Head = styled.div`
  width: calc(100% - 47px);
  padding-left: 23px;
  padding-right: 23px;
  height: 150px;
  background-color: #f1f1f1;
  color: #5a5a5a;
`;
const Body = styled.div`
  width: calc(100% - 47px);
  padding-left: 23px;
  padding-right: 23px;
`;
const Hold = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #383838;
  h2 {
    font-weight: 500;
    font-size: 17px;
    @media screen and (min-width: 800px) {
      font-size: 35px;
    }
  }
`;
const Nothing = styled.div`
  width: 100%;
  height: calc(100vh - 205px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CenterHold = styled.div`
  color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Pic = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 200px;
  height: 200px;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    object-position: center;
    border-radius: 50%;
  }
`;
const Txt = styled.div`
  font-size: 14px;
  color: gray;
  font-weight: bold;
`;
const Sxt = styled.div`
  font-size: 10px;
`;
