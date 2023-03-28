import React from "react";
import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const PersonalAccount = () => {
  return (
    <Container>
      <NameCard>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Logo htmlFor="pics">
            <BsFillPersonFill />
          </Logo>
          <Names>
            <div
              style={{
                color: "#444343",
                fontSize: "20px",
                fontWeight: "bold",
              }}>
              Isaac
            </div>
            <div style={{ fontSize: "14px", color: "#082bf3" }}>@iceprince</div>
          </Names>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#646363",
            fontSize: "18px",
          }}>
          <MdOutlineKeyboardArrowDown />
        </div>
      </NameCard>
      <div
        style={{
          marginTop: "40px",
          marginBottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}>
        <Inputs value="Isaac" />
        <Inputs2 value="iceprince" />
        <Inputs2 placeholder="iceprince@gmail.com" />
        <Inputs placeholder="NG +234 | 09167169741" />
        {/* <Button>Update Profile</Button> */}
      </div>
      {/* <Button2>Update Profile</Button2> */}
    </Container>
  );
};

export default PersonalAccount;

const Container = styled.div`
  width: 70%;
`;
const Inputs = styled.input`
  border: none;
  outline: none;
  width: calc(100% - 20px);

  padding-left: 20px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  background-color: #ececec92;
`;
const Inputs2 = styled.input`
  border: none;
  outline: none;
  width: calc(100% - 20px);
  padding-left: 20px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  background-color: #ececec92;
  color: #8a8888;
`;
const NameCard = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 2px solid #ececec;
`;
const Logo = styled.label`
  padding: 20px;
  font-size: 23px;
  color: #082bf3;
  background-color: #ececec;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Names = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;
const Button = styled.button`
  border-radius: 10px;
  color: white;
  background-color: #a002a0f2;
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  font-size: 15px;
  margin-top: 30px;
  transition: all 350ms;
  font-weight: bold;
  :hover {
    background-color: #940294;
  }
`;
const Button2 = styled.button`
  position: absolute;
  top: 100px;
  right: 30px;
  border-radius: 10px;
  color: white;
  background-color: #a002a0f2;
  width: 150px;
  height: 40px;
  border: none;
  outline: none;
  font-size: 15px;
  transition: all 350ms;
  font-weight: bold;
  :hover {
    background-color: #940294;
  }
`;
