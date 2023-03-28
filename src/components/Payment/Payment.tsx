import React from "react";
import styled from "styled-components";
import { FaWallet } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { UseAppDispatch } from "../Global/Store";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const Payment = () => {
  const [single, setSingle] = React.useState<any>();
  const { id } = useParams();
  const URl = "https://giftcard-api.onrender.com";

  const getDetails = async () => {
    await axios
      .get(`${URl}/api/getonegiftcard/${id}`)
      .then((res) => {
        setSingle(res);
        console.log("detail:", single);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };
  React.useEffect(() => {
    getDetails();
  }, []);
  // const user: any = {};
  // const dispatch = UseAppDispatch();
  // const apiUrl = "https://giftcard-api.onrender.com";
  // const payIn = () => {
  //   if (user) {
  //     axios
  //       .post(`${apiUrl}/api/buyagiftcard/${user?._id}/:businessID/:giftcardID`)
  //       .then((response) => {
  //         Swal.fire({
  //           position: "center",
  //           icon: "success",
  //           title: "payment SUCCESSFULL.",
  //           // timer: 1500,
  //           confirmButtonText: "Okay!",
  //         });
  //       })
  //       .catch((error: any) => {
  //         // handle error
  //         console.log("this is error", error);
  //       });
  //   }
  // };
  return (
    <div>
      <ContainerPay>
        <CancelPay></CancelPay>
        <WrapAllPay>
          <TopPay>
            <div>
              <IoMdLock />
            </div>
            <div>Secured by Korapay</div>
          </TopPay>
          <CardContainerPay>
            <UpPay>TEST MODE</UpPay>
            <MainCardPay>
              <WrapperPay>
                <TitlesPay>
                  <IconPay>
                    <FaWallet />
                  </IconPay>
                  <TitleTextPay>Pay NGN </TitleTextPay>
                </TitlesPay>
                <SubTitlesPay>
                  Enter your card information to complete this payment
                </SubTitlesPay>
                <form>
                  <WrapInputsPay>
                    <FirstLinePay>
                      <LabelPay>Card number</LabelPay>
                      <InputPay></InputPay>
                    </FirstLinePay>
                    <SecondLinePay>
                      <LeftPay>
                        <LabelPay>Expiry Date</LabelPay>
                        <Input1Pay></Input1Pay>
                      </LeftPay>
                      <RightPay>
                        <LabelPay>Cvv</LabelPay>
                        <Input2Pay></Input2Pay>
                      </RightPay>
                    </SecondLinePay>
                  </WrapInputsPay>
                  <WrapButtonPay>
                    <div style={{ fontSize: "17px" }}>
                      <IoMdLock />
                    </div>
                    <div>Pay NGN 1,000,000.00</div>
                  </WrapButtonPay>
                </form>
              </WrapperPay>
            </MainCardPay>
          </CardContainerPay>
          <BottomPay></BottomPay>
        </WrapAllPay>
      </ContainerPay>
    </div>
  );
};

export default Payment;

const ContainerPay = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f4fd;
  position: absolute;
  left: 0;
`;
const CancelPay = styled.div``;
const TopPay = styled.div`
  display: flex;
  align-items: center;
`;
const BottomPay = styled.div``;
const WrapAllPay = styled.div``;
const UpPay = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5%;
`;
const CardContainerPay = styled.div`
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
const MainCardPay = styled.div`
  width: 100%;
  height: 95%;
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
`;
const WrapperPay = styled.div`
  width: 80%;
  height: 87%;
  margin: auto;
  letter-spacing: normal;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TitlesPay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const IconPay = styled.div`
  color: silver;
  font-size: 27px;
`;
const TitleTextPay = styled.div`
  color: #1d1d1d;
  font-size: 15px;
`;
const SubTitlesPay = styled.div`
  font-size: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #1d1d1d;
  text-align: center;
`;
const WrapButtonPay = styled.button`
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

const FirstLinePay = styled.div``;
const SecondLinePay = styled.div`
  display: flex;
`;
const LabelPay = styled.label`
  color: lightgray;
  font-size: 12px;
  margin-bottom: 5px;
`;
const InputPay = styled.input`
  width: 97%;
  height: 30px;
  border-radius: 9px;
  border: 1px solid #969696c6;
  outline: none;
`;
const WrapInputsPay = styled.div`
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
const LeftPay = styled.div`
  width: 50%;
  height: 100%;
`;
const RightPay = styled.div`
  width: 50%;
  height: 100%;
`;
const Input1Pay = styled.input`
  width: 95%;
  height: 30px;
  border-top-left-radius: 9px;
  border-bottom-left-radius: 9px;
  border: 1px solid #969696c6;
  outline: none;
`;
const Input2Pay = styled.input`
  width: 95%;
  height: 30px;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  border: 1px solid #969696c6;
  outline: none;
`;
