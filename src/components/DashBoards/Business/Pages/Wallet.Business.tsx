import React, { useState } from "react";
import styled from "styled-components";
// import ProfileComp from "../Home/ProfileComp";
import { AiFillEye, AiFillEyeInvisible, AiOutlinePlus } from "react-icons/ai";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import { UseAppDispatch, useAppSelector } from "../../../Global/Store";
import axios from "axios";
import Swal from "sweetalert2";
import two from "../../../../Assets/two.svg";
import { FaWallet } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { transactionHistory } from "../../../API/Endpoint";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useKorapay, KorapayButton } from "react-korapay";

const BusinessWallet = () => {
  const [show, setShow] = useState(false);
  const [popup, setPopup] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [fundWallet, setFundWallet] = useState(false);
  const dispatch = UseAppDispatch();
  const user = useAppSelector((state) => state.bizClient);
  const navigate = useNavigate();

  const ShowPop = () => {
    setPopup(true);
  };
  const ShowPay = () => {
    setFundWallet(!fundWallet);
  };
  const HidePop = () => {
    setPopup(false);
  };

  const config: any = {
    public_key: "pk_test_N8LsV4WUPJYfM97H11kkgyLxR9NqQNLe1yjaLonb",
    amount: amount,
    customer: {
      name: user?.name,
      email: user?.email,
    },
    narration: `${amount} withdrawal successful`,
  };

  const korapayBtnConfig = {
    ...config,
    onClose: () => {},
    onSuccess: () => {},
    text: "Process Payment!",
  };

  const handleKorapay: any = useKorapay(config);

  const URl = "https://giftcard-api.onrender.com";
  const business = useAppSelector((state) => state.bizClient);
  console.log(`this is buzz ${business?._id}`);
  // console.log("client", business);

  const postPay = async (e: any) => {
    e.PreventDefault();
    await axios
      .post(`${URl}/api/withdraw-money/${business?._id}`, {
        amount,
      })
      .then((res) => {
        console.log("pay", res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Payout sucessfull",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(`this is err from axios ${err}`);
      });
  };

  const userSchema = yup
    .object({
      name: yup.string().required("please card name"),
      number: yup.number().positive().required("please enter card number"),
      amount: yup.number().positive().required("please enter funding amount"),
      expiry_month: yup.number().positive().required("please enter card pin"),
      expiry_year: yup.number().positive().required("please enter card pin"),
      pin: yup.number().positive().required("please enter card pin"),
      cvv: yup.number().positive().required("please enter card cvv"),
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
    <>
      <div>
        {popup ? (
          <Popup>
            <Card>
              <MdOutlineCancel
                onClick={HidePop}
                style={{
                  color: "silver",
                  fontSize: "40px",
                  position: "absolute",
                  right: "-29px",
                  top: "-29px",
                  cursor: "pointer",
                  zIndex: "2",
                }}
              />
              <h2>Process Withdrawal</h2>
              <p>Withdraw funds from wallet</p>
              <AmountHold>
                ₦20000
                {/* {business?.Balance} */}
              </AmountHold>
              <input
                type="number"
                placeholder="Enter amount to withdraw"
                onChange={(e: any) => {
                  setAmount(Number(e.target.value));
                }}
              />
              {/* <button
                onClick={() => {
                  handleKorapay();
                }}
              >
                Process Payment
              </button> */}{" "}
              <KorapayButton {...korapayBtnConfig} />
            </Card>
          </Popup>
        ) : null}

        {fundWallet ? (
          <Popup>
            <WrapAllPay onSubmit={Submit}>
              <TopPay>
                <div>
                  <IoMdLock />
                </div>
                <div>Secured by Korapay</div>
              </TopPay>
              <CardContainerPay>
                <CancelPay onClick={ShowPay}>
                  <MdCancel />
                </CancelPay>
                <UpPay>TEST MODE</UpPay>
                <MainCardPay>
                  <WrapperPay>
                    <TitlesPay>
                      <IconPay>
                        <FaWallet />
                      </IconPay>
                      <TitleTextPay>Fund Your Wallet</TitleTextPay>
                    </TitlesPay>
                    <SubTitlesPay>
                      Enter your card information to complete this payment
                    </SubTitlesPay>
                    <form>
                      <WrapInputsPay>
                        <FirstLinePay>
                          <LabelPay>name</LabelPay>
                          <InputPay
                            {...register("name")}
                            required
                            value="Test Cards"
                          />

                          <LabelPay>number</LabelPay>
                          <InputPay
                            {...register("number")}
                            required
                            value="5188513618552975"
                          />

                          <LabelPay>amount</LabelPay>
                          <InputPay {...register("amount")} required />
                          <LabelPay>pin</LabelPay>
                          <InputPay
                            {...register("pin")}
                            required
                            value="1234"
                          />
                          <LabelPay>Expiry Year</LabelPay>
                          <InputPay
                            {...register("expiry_year")}
                            required
                            value="30"
                          />
                        </FirstLinePay>
                        {/* <FirstLinePay> */}

                        {/* </FirstLinePay> */}
                        <SecondLinePay>
                          <LeftPay>
                            <LabelPay>Expiry Month</LabelPay>
                            <Input1Pay
                              {...register("expiry_month")}
                              required
                              value="09"
                            />
                          </LeftPay>
                          <RightPay>
                            <LabelPay>Cvv</LabelPay>
                            <Input2Pay
                              {...register("cvv")}
                              required
                              value="123"
                            />
                          </RightPay>
                        </SecondLinePay>
                      </WrapInputsPay>
                      <WrapButtonPay>
                        <div style={{ fontSize: "17px" }}>
                          <IoMdLock />
                        </div>
                        <div
                        // onClick={payIn}
                        >
                          Pay NGN
                        </div>
                      </WrapButtonPay>
                    </form>
                  </WrapperPay>
                </MainCardPay>
              </CardContainerPay>
              <BottomPay></BottomPay>
            </WrapAllPay>
          </Popup>
        ) : null}
      </div>
      <Container>
        <Head>
          <InHead>
            <Message>Wallet</Message>
            <SeeBalance>
              <BalanceDetails>
                <Viewer>
                  <div style={{ marginBottom: "5px" }}>Available balance</div>
                  <div
                    onClick={() => {
                      setShow(!show);
                    }}
                  >
                    {show ? (
                      <AiFillEye
                        style={{ marginTop: "5px", fontSize: "30px" }}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        style={{ marginTop: "5px", fontSize: "30px" }}
                      />
                    )}
                  </div>
                </Viewer>
                {show ? (
                  <Info>${business?.Balance}</Info>
                ) : (
                  <Info>*******</Info>
                )}
              </BalanceDetails>
              <WithdrawButton onClick={ShowPop}>Withdraw</WithdrawButton>
            </SeeBalance>
          </InHead>
        </Head>
        <Body>
          <InBody>
            <CardComponent2>
              <CardImage2>
                <img src={two} />
              </CardImage2>
              <div>
                <HText2>Top Gift Cards</HText2>
                <LText2 style={{ fontSize: "12px" }}>
                  Trade gift cards for Fast Cash
                </LText2>
              </div>
              <CardButton2 onClick={ShowPay}>Fund Wallet</CardButton2>
            </CardComponent2>

            <History>
              <p>Recent withdrawals</p>
              <HistoryHold>
                <Up>
                  <Inn>
                    <p>S/N</p>
                    <p>Logo</p>
                    <p>Company Name</p>
                    <p>Date and Time</p>
                    <p>Amount</p>
                  </Inn>
                </Up>
                <All>
                  <Two>
                    <p>1</p>
                    <Circle bc={`#${Math.floor(Math.random() * 1000 + 2345)}`}>
                      <p style={{ color: "white", fontSize: "18px" }}>I</p>
                    </Circle>
                    <p>Issac Enterprises</p>
                    <p>13-03-23/10:00am</p>
                    <p>{(3000.0).toLocaleString()}</p>
                  </Two>
                  <Two>
                    <p>1</p>
                    <Circle bc={`#${Math.floor(Math.random() * 1000 + 2345)}`}>
                      <p style={{ color: "white", fontSize: "18px" }}>I</p>
                    </Circle>
                    <p>Issac Enterprises</p>
                    <p>13-03-23/10:00am</p>
                    <p>{(3000.0).toLocaleString()}</p>
                  </Two>
                  <Two>
                    <p>1</p>
                    <Circle bc={`#${Math.floor(Math.random() * 1000 + 2345)}`}>
                      <p style={{ color: "white", fontSize: "18px" }}>I</p>
                    </Circle>
                    <p>Issac Enterprises</p>
                    <p>13-03-23/10:00am</p>
                    <p>{(3000.0).toLocaleString()}</p>
                  </Two>
                  <Two>
                    <p>1</p>
                    <Circle bc={`#${Math.floor(Math.random() * 1000 + 2345)}`}>
                      <p style={{ color: "white", fontSize: "18px" }}>I</p>
                    </Circle>
                    <p>Issac Enterprises</p>
                    <p>13-03-23/10:00am</p>
                    <p>{(3000.0).toLocaleString()}</p>
                  </Two>
                </All>
              </HistoryHold>
            </History>
          </InBody>
        </Body>
      </Container>
    </>
  );
};

export default BusinessWallet;

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
const CancelPay = styled.div`
  position: absolute;
  right: -24px;
  top: -24px;
  color: lightgray;
  font-size: 30px;

  :hover {
    cursor: pointer;
  }
`;
const TopPay = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
`;
const BottomPay = styled.div``;
const WrapAllPay = styled.form``;
const UpPay = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5%;
`;
const CardContainerPay = styled.div`
  width: 330px;
  /* height: 450px; */
  border-radius: 10px;
  background-color: #e76b18;
  color: white;
  font-size: 10px;
  letter-spacing: 2px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
`;
const MainCardPay = styled.div`
  width: 100%;
  /* height: 95%; */
  border-radius: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
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

const HText2 = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #ffa500;
  @media screen and (min-width: 800px) {
    font-size: 29px;
  }
`;
const LText2 = styled.div`
  font-size: 12px;
  color: #3d3d3d;

  @media screen and (min-width: 800px) {
    font-size: 22px;
  }

  @media screen and (max-width: 799px) {
    font-size: 17px;
  }
`;

const CardImage2 = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  img {
    width: 90%;
    height: 90%;
  }
`;

const CardComponent2 = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  gap: 20px;
  width: calc(100% - 20px);
  padding: 20px;
  background-color: #cecfffad;
  @media screen and (min-width: 670px) {
    width: calc(45% - 20px);
  }
`;
const CardButton2 = styled.button`
  max-width: 200px;
  border-radius: 5px;
  color: white;
  background-color: #ffa500;
  border: none;
  outline: none;
  font-weight: bold;
  padding: 10px 20px;
  transition: all 350ms;
  :hover {
    cursor: pointer;
    background-color: #913cf9;
  }
`;

const Inn = styled.div`
  width: 91%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Two = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1f1f1;
  margin: 5px;
  /* border-radius: 5px; */
`;

const Circle = styled.div<{ bc: string }>`
  width: 50px;
  height: 50px;
  @media screen and (max-width: 800px) {
    width: 33px;
    height: 33px;
  }
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bc }) => bc};
`;

const All = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  /* background-color: red; */
  /* margin-left: 30px; */
  /* padding: 25px; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(17, 12, 12, 0.06) 0px 2px 4px -1px;
  overflow: hidden;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: silver;
    border-radius: 10px;
  }
`;

const Up = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid silver;
  position: sticky;
  top: 0.1px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px; */
  background-color: white;
`;

const HistoryHold = styled.div`
  width: 80%;
  background-color: white;
  /* padding: 25px; */
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-radius: 10px;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow-y: scroll;
  position: relative;
  ::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-thumb {
    background-color: silver;
    border-radius: 10px;
  }
`;

const History = styled.div`
  width: 100%;
  /* background-color: #f9f4ff; */
  border-radius: 10px;
  margin-top: 15px;
  padding-top: 13px;
  margin-bottom: 25px;

  p {
    font-size: 16px;
    font-weight: 500;
    @media screen and (max-width: 800px) {
      font-size: 13px;
      font-weight: 600;
    }
  }
`;

const Head = styled.div`
  width: 100%;
  max-height: 240px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InHead = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;
const Message = styled.div`
  font-size: 25px;
  span {
    font-weight: 600;
  }
`;
const SeeBalance = styled.div`
  color: blue;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Viewer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  font-size: 17px;
`;
const Info = styled.div`
  font-size: 20px;
`;
const BalanceDetails = styled.div``;
const WithdrawButton = styled.button`
  border-radius: 10px;
  width: 250px;
  color: white;
  background-color: #a35ef7;
  padding: 15px 60px;
  border: none;
  outline: none;
  font-size: 17px;
  margin-top: 30px;
  transition: all 350ms;
  :hover {
    cursor: pointer;
    background-color: #913cf9;
  }
`;
const Body = styled.div`
  width: 100%;
  color: #3d3d3d;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const InBody = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;
const Defaults = styled.div``;
const OtherDefault = styled.div`
  margin-top: 60px;
`;
const AddNew = styled.div`
  padding: 40px;
  color: blue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid blue;
  margin-top: 10px;
  @media screen and (min-width: 800px) {
    width: 400px;
  }
`;

const AmountHold = styled.div`
  width: 97%;
  height: 48px;
  border-radius: 10px;
  background-color: #f9f4ff;
  margin-bottom: 20px;
  display: flex;
  padding-left: 10px;
  font-size: 16px;
  font-weight: 600;
  align-items: center;
`;

const Card = styled.div`
  width: 310px;
  padding: 30px;
  height: 350px;
  background-color: white;
  position: relative;
  border-radius: 15px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;

  h2 {
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 25px;
  }

  input {
    width: 97%;
    height: 48px;
    border-radius: 10px;
    background-color: #f9f4ff;
    border: 0;
    outline: 0;
    padding-left: 10px;

    ::placeholder {
      color: silver;
    }
  }

  button {
    width: 100%;
    height: 50px;
    border: 0;
    border-radius: 10px;
    color: white;
    background-color: blueviolet;
    margin-top: 80px;
  }
`;

const Popup = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  top: 0;
  left: 0;
`;

const AddBox = styled.div`
  width: 280px;
  height: 130px;
  border: 1px solid blue;
  margin-left: 270px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;

  p {
    margin: 0;
    font-size: 17px;
    color: blue;
  }
`;
