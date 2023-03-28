import React from "react";
import styled from "styled-components";
import pic from "../../.././Images/trancard.svg";
import Card from "../Props/Cards";
import { FaWallet } from "react-icons/fa";

const ViewCards = () => {
  const dummy = [{ card: "One" }, { card: "Two" }];
  return (
    <div>
      {dummy.length === 0 ? (
        <Nothing>
          <CenterHold>
            <Pic>
              <img src={pic} />
            </Pic>
            <Txt>No Withdrawals Yet!</Txt>
            <Sxt>
              This place is empty because you haven't made any withdrawal 😒
            </Sxt>
          </CenterHold>
        </Nothing>
      ) : (
        <div>
          <CardContainer>
            <Card
              pic={<FaWallet />}
              busyname="iTunes"
              amount={80}
              colour="#a30000"
              code="9000ojja"
            />
            <Card
              pic={<FaWallet />}
              busyname="LexCorp"
              amount={790}
              colour="#2b00a3"
              code="9000sssa"
            />{" "}
            <Card
              pic={<FaWallet />}
              busyname="Spotify"
              amount={900}
              colour="#34a300"
              code="900oijja"
            />{" "}
            <Card
              pic={<FaWallet />}
              busyname="eaSports"
              amount={10}
              colour="#a30080"
              code="889pbja"
            />
          </CardContainer>
        </div>
      )}
    </div>
  );
};

export default ViewCards;

const Container = styled.div``;
const CardContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
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
  font-size: 16px;
  color: gray;
  font-weight: bold;
`;
const Sxt = styled.div`
  font-size: 14px;
  max-width: 250px;
  color: #9c9c9c;
`;
