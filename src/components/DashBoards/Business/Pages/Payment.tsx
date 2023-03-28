import React from "react";
import styled from "styled-components";
import { FaWallet } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import { UseAppDispatch } from "../../../Global/Store";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionHistory } from "../../../API/Endpoint";
import { useForm } from "react-hook-form";

const PayOut = () => {
  const user: any = {};
  const dispatch = UseAppDispatch();
  const navigate = useNavigate();

  //   const apiUrl = "https://giftcard-api.onrender.com";
  //   const payIn = () => {
  //     if (user) {
  //       axios
  //         .post(`${apiUrl}/api/buyagiftcard/${user?._id}/:businessID/:giftcardID`)
  //         .then((response) => {
  //           Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             title: "payment SUCCESSFULL.",
  //             // timer: 1500,
  //             confirmButtonText: "Okay!",
  //           });
  //         })
  //         .catch((error: any) => {
  //           // handle error
  //           console.log("this is error", error);
  //         });
  //     }
  //   };

  const userSchema = yup
    .object({
      email: yup.string().required("please enter an email"),
      password: yup.string().required("please enter a password"),
    })
    .required();
  type formData = yup.InferType<typeof userSchema>;

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<formData>({
    resolver: yupResolver(userSchema),
  });

  const posting = useMutation({
    mutationKey: ["fund-wallet"],
    mutationFn: transactionHistory,

    onSuccess: (myData) => {
      console.log("this is the user", myData);
      //   dispatch(Userlogin(myData.data));

      Swal.fire({
        title: "Payment Successful",
        html: "Taking you to your dashboard",
        // timer: 1000,
        // timerProgressBar: true,

        willClose: () => {
          navigate("/dashboard/wallet");
        },
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: "registration failed",
        text: "email or password incorrect",
        icon: "error",
      });
    },
  });

  const Submit = handleSubmit(async (data) => {
    posting.mutate(data);
    // console.log(data);
    // reset()
  });
  return (
    <div>
      <Container>
        <Cancel></Cancel>
        <WrapAll>
          <Top>
            <div>
              <IoMdLock />
            </div>
            <div>Secured by Korapay</div>
          </Top>
          <CardContainer>
            <Up>TEST MODE</Up>
            <MainCard>
              <Wrapper>
                <Titles>
                  <Icon>
                    <FaWallet />
                  </Icon>
                  <TitleText>Pay NGN 1,000,000.00</TitleText>
                </Titles>
                <SubTitles>
                  Enter your card information to complete this payment
                </SubTitles>
                <form>
                  <WrapInputs>
                    <FirstLine>
                      <Label>Card number</Label>
                      <Input></Input>
                    </FirstLine>
                    <FirstLine>
                      <Label>Card number</Label>
                      <Input></Input>
                    </FirstLine>
                    <FirstLine>
                      <Label>Card number</Label>
                      <Input></Input>
                    </FirstLine>
                    <FirstLine>
                      <Label>Card number</Label>
                      <Input></Input>
                    </FirstLine>
                    <FirstLine>
                      <Label>Card number</Label>
                      <Input></Input>
                    </FirstLine>
                    <SecondLine>
                      <Left>
                        <Label>Expiry Date</Label>
                        <Input1></Input1>
                      </Left>
                      <Right>
                        <Label>Cvv</Label>
                        <Input2></Input2>
                      </Right>
                    </SecondLine>
                  </WrapInputs>
                  <WrapButton>
                    <div style={{ fontSize: "17px" }}>
                      <IoMdLock />
                    </div>
                    <div>Pay NGN 1,000,000.00</div>
                  </WrapButton>
                </form>
              </Wrapper>
            </MainCard>
          </CardContainer>
          <Bottom></Bottom>
        </WrapAll>
      </Container>
    </div>
  );
};

export default PayOut;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f4fd;
  position: absolute;
  left: 0;
`;
const Cancel = styled.div``;
const Top = styled.div`
  display: flex;
  align-items: center;
`;
const Bottom = styled.div``;
const WrapAll = styled.div``;
const Up = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5%;
`;
const CardContainer = styled.div`
  width: 330px;
  height: 450px;
  border-radius: 10px;
  background-color: #e76b18;
  color: white;
  font-size: 10px;
  letter-spacing: 2px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;
const MainCard = styled.div`
  width: 100%;
  height: 95%;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
`;
const Wrapper = styled.div`
  width: 80%;
  height: 87%;
  margin: auto;
  letter-spacing: normal;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Titles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.div`
  color: silver;
  font-size: 27px;
`;
const TitleText = styled.div`
  color: #1d1d1d;
  font-size: 15px;
`;
const SubTitles = styled.div`
  font-size: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #1d1d1d;
  text-align: center;
`;
const WrapButton = styled.button`
  width: 105%;
  height: 40px;
  border-radius: 10px;
  margin-top: 12px;
  background-color: #4bcca1;
  font-size: 12px;
  font-weight: 600;
  color: white;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const FirstLine = styled.div``;
const SecondLine = styled.div`
  display: flex;
`;
const Label = styled.label`
  color: lightgray;
  font-size: 12px;
  margin-bottom: 5px;
`;
const Input = styled.input`
  width: 97%;
  height: 30px;
  border-radius: 9px;
  border: 1px solid #969696c6;
  outline: none;
`;
const WrapInputs = styled.div`
  width: calc(100% - 13px);
  border-radius: 10px;
  padding: 13px;
  background-color: #e2ebff6a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const Left = styled.div`
  width: 50%;
  height: 100%;
`;
const Right = styled.div`
  width: 50%;
  height: 100%;
`;
const Input1 = styled.input`
  width: 95%;
  height: 30px;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  border: 1px solid #969696c6;
  outline: none;
`;
const Input2 = styled.input`
  width: 95%;
  height: 30px;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  border: 1px solid #969696c6;
  outline: none;
`;
