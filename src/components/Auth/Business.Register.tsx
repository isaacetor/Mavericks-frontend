import React from "react";
import styled from "styled-components";
import rstar from "../../Assets/stars.svg";
import lstar from "../../Assets/stars.svg";
import phone from "../../Assets/phone.png";
import flower from "../../Assets/flower.svg";
import { BsPerson } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { TbSquareKey } from "react-icons/tb";
import * as yup from "yup";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { UseAppDispatch } from "../Global/Store";
import { useMutation } from "@tanstack/react-query";
import { createBizUser } from "../API/Endpoint";

const BizzSignUp = () => {
  const navigate = useNavigate();

  const userSchema = yup
    .object({
      name: yup.string().required("please enter a name"),
      email: yup.string().required("please enter an email"),
      phoneNumber: yup.number().required("please your phone number"),
      password: yup.string().required("please enter a password"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "passwords must match")
        .required("please confirm your password"),
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
    mutationKey: ["created"],
    mutationFn: createBizUser,

    onSuccess: (myData) => {
      console.log("user", myData);
      //   dispatch(login(myData.data));
      Swal.fire({
        title: "registration succesful",
        html: "redirecting to login",
        timer: 1000,
        timerProgressBar: true,

        willClose: () => {
          navigate("/business/login");
        },
      });
    },
  });

  const Submit = handleSubmit(async (data: any) => {
    // console.log(data);
    posting.mutate(data);

    // reset()
  });

  return (
    <div>
      <Container>
        <Left>
          <img
            src={rstar}
            alt=""
            style={{ position: "absolute", left: "75%", top: "20%" }}
          />
          <img
            src={lstar}
            alt=""
            style={{
              position: "absolute",
              top: "20%",
              left: "35px",
              height: "360px",
            }}
          />
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <h4>MAVERICK</h4>
          </NavLink>
          <H1>
            Register Your <br /> Business Today!
          </H1>
          <p>
            You’re a few steps away. Fill the required form and start trading
            like a boss 😎
          </p>
          <Img src={phone} alt="" />
          <img
            src={flower}
            alt=""
            style={{ position: "absolute", bottom: "1%", left: "1px" }}
          />
        </Left>
        <Right onSubmit={Submit}>
          <h2>Create an Account</h2>
          <p>Let us know you 😎</p>
          <Box>
            <Inputs>
              <BsPerson
                style={{
                  marginLeft: "15px",
                  fontSize: "25px",
                  color: "silver",
                }}
              />
              <input
                {...register("name")}
                placeholder="Business Name"
                required
              />
              <Erro>{errors?.name && errors?.name?.message}</Erro>
            </Inputs>

            <Inputs>
              <IoMailOutline
                style={{
                  marginLeft: "15px",
                  fontSize: "25px",
                  color: "silver",
                }}
              />
              <input
                {...register("email")}
                placeholder="Business e-mail"
                required
              />
              <Erro>{errors?.email && errors?.email?.message}</Erro>
            </Inputs>
            <Inputs>
              <BsTelephone
                style={{
                  marginLeft: "15px",
                  fontSize: "25px",
                  color: "silver",
                }}
              />
              <input
                {...register("phoneNumber")}
                placeholder="Phone-no"
                required
                minLength={11}
              />
              <Erro>{errors?.phoneNumber && errors?.phoneNumber?.message}</Erro>
            </Inputs>
            <Inputs>
              <TbSquareKey
                style={{
                  marginLeft: "15px",
                  fontSize: "25px",
                  color: "silver",
                }}
              />
              <input
                {...register("password")}
                placeholder="Password"
                required
                type="password"
              />
              <Erro>{errors?.password && errors?.password?.message}</Erro>
            </Inputs>
            <Inputs>
              <TbSquareKey
                style={{
                  marginLeft: "15px",
                  fontSize: "25px",
                  color: "silver",
                }}
              />
              <input
                {...register("confirmPassword")}
                placeholder="Confirm password"
                required
                type="password"
              />
              <Erro>
                {errors?.confirmPassword && errors?.confirmPassword?.message}
              </Erro>
            </Inputs>
          </Box>
          <Div>
            <input
              type="checkbox"
              style={{ width: "15px", height: "15px", background: "#f9f4ff" }}
              required
            />
            <p
              style={{
                margin: "0",
                marginLeft: "10px",
                fontSize: "15px",
              }}
            >
              I agree to MAVERICK'S
              <span style={{ color: "blue" }}>Terms and Conditions</span> &
              <span style={{ color: "blue" }}>Privacy Policy</span>.
            </p>
          </Div>
          <Button type="submit">Create Account</Button>{" "}
          <span>
            already have an account?
            <NavLink
              to="/business/login"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Log in
            </NavLink>
          </span>
        </Right>
      </Container>
    </div>
  );
};

export default BizzSignUp;

const Erro = styled.span`
  font-size: 10px;
  color: red;
`;

const Button = styled.button`
  width: 170px;
  height: 48px;
  margin-left: 60px;
  border: 0;
  background-color: #8246f3;
  color: white;
  border-radius: 10px;
  margin-top: 31px;
  font-size: 16px;
  cursor: pointer;

  @media screen and (max-width: 960px) {
    margin: 0;
    margin-top: 20px;
    width: 80%;
  }
`;

const H1 = styled.h1`
  color: white;
  font-size: 44px;
  text-align: center;
  margin-top: 50px;
  animation: typing 4s steps(20);
  white-space: nowrap;
  overflow: hidden;
  /* border-right: 3px solid black; */

  @media screen and (max-width: 960px) {
    font-size: 30px;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

const Div = styled.div`
  display: flex;
  margin-left: 60px;
  margin-top: 20px;
  align-items: center;
  @media screen and (max-width: 960px) {
    margin: 0;
    font-size: 10px;
    margin-top: 10px;
    width: 80%;
  }
`;

const Inputs = styled.div`
  background-color: #f9f4ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  overflow: hidden;

  input {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    margin-left: 7px;

    ::placeholder {
      color: silver;
    }
  }

  p {
    margin: 0;
    color: red;
    font-size: 3px;
  }
`;

const Box = styled.div`
  width: 650px;
  height: 240px;
  /* background-color: green; */
  margin-left: 60px;
  display: grid;
  grid-template-rows: repeat(2, 65px);
  grid-template-columns: repeat(2, 1fr);
  gap: 23px;
  margin-top: 43px;

  @media screen and (max-width: 960px) {
    width: 90%;
    height: 450px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 70px);
    margin: 0;
    margin-top: 20px;
  }
`;

const Img = styled.img`
  height: 230px;
  margin-top: 25px;
  transform: translate(-20%, -20%);
  transition: transform 0.3s ease-in-out;
  position: absolute;
  left: 35%;
  bottom: 1px;

  :hover {
    animation: bounce 0.5s;
  }
  @keyframes bounce {
    0%,
    100% {
      transform: translate(-20%, -20%) scale(1);
    }
    50% {
      transform: translate(-20%, -20%) scale(1.2);
    }
  }

  @media screen and (max-width: 960px) {
    position: static;
    height: 210px;
    margin-top: 60px;
    margin-left: 120px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;

  @media screen and (max-width: 960px) {
    display: block;
  }
`;
const Left = styled.div`
  width: 40%;
  height: 100vh;
  background-color: #8246f3;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  @media screen and (max-width: 960px) {
    width: 100%;
  }
  h4 {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 30px;
  }

  p {
    color: white;
    margin: 0;
    margin-top: 10px;
    text-align: center;
    width: 65%;
    font-size: 23px;

    @media screen and (max-width: 960px) {
      font-size: 18px;
    }
  }
`;
const Right = styled.form`
  h2 {
    margin-top: 60px;
    margin-left: 60px;
    font-size: 36px;

    @media screen and (max-width: 960px) {
      margin: 0;
      margin-top: 10px;
      font-size: 25px;
    }
  }

  p {
    margin-left: 60px;
    margin-top: 45px;
    font-size: 20px;
    font-family: 600;

    @media screen and (max-width: 960px) {
      margin: 0;
      margin-top: 10px;
      font-size: 25px;
      font-size: 18px;
    }
  }
  @media screen and (max-width: 960px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  span {
    font-size: 13px;
    margin: 5px;
  }
`;
