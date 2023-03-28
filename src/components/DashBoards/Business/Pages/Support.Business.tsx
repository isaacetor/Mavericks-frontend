import React from "react";
import styled from "styled-components";
import { BsAppIndicator } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const BusinessSupport = () => {
  return (
    <Container>
      <Head>
        <Hold>
          <h2>Customer Support</h2>
        </Hold>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          marginTop: "50px",
          marginLeft: "50px",
        }}>
        <Item>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Text>Send us an email</Text>
          </div>
          <Arr>
            <MdOutlineKeyboardArrowRight />
          </Arr>
        </Item>
        <div>
          <Item2>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Text>FAQs</Text>
            </div>
            <Arr>
              <MdOutlineKeyboardArrowRight />
            </Arr>
          </Item2>
          <Item3>
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Text>Terms</Text>
            </div>
            <Arr>
              <MdOutlineKeyboardArrowRight />
            </Arr>
          </Item3>
        </div>
      </div>
    </Container>
  );
};

export default BusinessSupport;

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

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(70% - 20px);
  padding-left: 50px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  background-color: #ececec92;
  transition: all 350ms;
  :hover {
    background-color: #ecececd8;
  }
`;
const Item2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(70% - 20px);
  padding-left: 50px;
  height: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 16px;
  background-color: #ececec92;
  transition: all 350ms;
  :hover {
    background-color: #ecececd8;
  }
`;
const Item3 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(70% - 20px);
  padding-left: 50px;
  height: 50px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 16px;
  background-color: #ececec92;
  transition: all 350ms;
  :hover {
    background-color: #ecececd8;
  }
`;
const Icon = styled.div`
  color: #5e5e5e;
`;
const Text = styled.div`
  margin-bottom: 3px;
  color: #303030;
`;
const Arr = styled.div`
  font-size: 20px;
  margin-right: 10px;
  color: #5e5e5e;
`;
