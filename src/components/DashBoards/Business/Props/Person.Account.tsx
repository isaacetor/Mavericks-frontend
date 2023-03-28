import React from "react";
import styled from "styled-components";
import { BsFillPersonFill } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import pic from "../../.././Images/trancard.svg";
import { UseAppDispatch, useAppSelector } from "../../../Global/Store";
import axios from "axios";
import Swal from "sweetalert2";

const PersonalAccount = () => {
  const [previewImage, setPreviewImage] = React.useState("");
  const [image, setImage] = React.useState("");
  const business = useAppSelector((state) => state.bizClient);
  const card = useAppSelector((state) => state.DataCard);
  const dispatch = UseAppDispatch();
  const apiUrl = "https://giftcard-api.onrender.com";

  const ImageOnchange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    console.log(url);
  };

  // allow user upload profile image
  const updateProfileImage = () => {
    if (image) {
      // create a new FormData object and append the selected image file to it
      const formData = new FormData();
      formData.append("logo", image);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      // make a request to update the company logo using the formData object
      axios
        .patch(
          `${apiUrl}/api/updatebusinesslogo/${business?._id}
  `,
          formData,
          config
        )
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "image uploaded SUCCESSFULLY.",
            // timer: 1500,
            confirmButtonText: "Okay!",
          });
        })
        .catch((error: any) => {
          // handle error
          console.log("this is error", error);
        });
    }
  };

  console.log(business?._id);

  return (
    <Container>
      <NameCard>
        <Update>
          <CircleText>
            <Circle>
              <Img src={card?.BrandLogo === "" ? pic : card?.BrandLogo} />
            </Circle>
            <label htmlFor="pix">upload Logo</label>
          </CircleText>
          <Input
            onChange={ImageOnchange}
            id="pix"
            // type="multipart/form-data"
            type="file"
          />
          <Buttons onClick={updateProfileImage}>Update company logo</Buttons>
        </Update>
      </NameCard>
      <div
        style={{
          marginTop: "40px",
          marginBottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}>
        <Inputs>{business?.name}</Inputs>
        <Inputs>{business?.email}</Inputs>
        <Inputs>+{business?.phoneNumber}</Inputs>
        <Inputs>{business?.giftCard.length} Giftcards Created</Inputs>
      </div>
    </Container>
  );
};

export default PersonalAccount;

const CircleText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    padding: 10px 30px;
    border-bottom: 1px solid #ef9636;
    color: #ef9636;
    font-size: 13px;
    border-radius: 10px;
    /* color: #fff; */

    :hover {
      cursor: pointer;
    }
  }
`;

const Buttons = styled.label`
  height: 40px;
  width: 200px;
  background-color: blueviolet;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: all 350ms;
  cursor: pointer;
  :hover {
    transform: scale(0.98);
  }
`;

const Input = styled.input`
  display: none;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
`;

const Circle = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  /* border-radius: 50%; */
  background-color: #d3d3d3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  flex-direction: column;
  font-size: 30px;

  span {
    font-size: 12px;
  }
`;

const Update = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  align-items: center;
  padding-bottom: 20px;
  margin-top: 20px;
  /* flex-direction: column; */
`;

const Container = styled.div`
  width: 70%;
`;
const Inputs = styled.div`
  border: none;
  outline: none;
  width: calc(100% - 20px);

  padding-left: 20px;
  display: flex;
  align-items: center;
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
  display: flex;
  justify-content: space-between;

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
