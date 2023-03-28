import React from "react";
import styled from "styled-components";
import rstar from "../../Assets/stars.svg";
import lstar from "../../Assets/stars.svg";
import phone from "../../Assets/phone.png";
import flower from "../../Assets/flower.svg";
import { BsPerson } from "react-icons/bs";
import { TbSquareKey } from "react-icons/tb";
import * as yup from "yup";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { UseAppDispatch } from "../Global/Store";
import { useMutation } from "@tanstack/react-query";
import { LoginBizUser } from "../API/Endpoint";
import { login } from "../Global/ReduxState";

const BizzLogin = () => {
  const navigate = useNavigate();
  const dispatch = UseAppDispatch();

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
    mutationKey: ["login"],
    mutationFn: LoginBizUser,

    onSuccess: (myData) => {
      // console.log("this is the user", myData);
      dispatch(login(myData.data));

      Swal.fire({
        title: "Login succesful",
        html: "Taking you to your dashboard",
        timer: 1000,
        timerProgressBar: true,

        didOpen: () => {
          Swal.showLoading();
        },

        willClose: () => {
          navigate("/dashboard");
        },
      });
    },
    onError: (error: any) => {
      // console.log(" this is error", error);
      // handle error here
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
          <h1>
            Glad to have <br /> you back
          </h1>
          <p>
            Glad to have you back We are glad to have you back ☺️, Let’s get you
            trading
          </p>
          <Img src={phone} alt="" />
          <img
            src={flower}
            alt=""
            style={{ position: "absolute", bottom: "1%", left: "1px" }}
          />
        </Left>
        <Right onSubmit={Submit}>
          <h2>Log in</h2>
          <Inputs>
            <BsPerson
              style={{
                marginLeft: "15px",
                fontSize: "25px",
                opacity: "0.4",
              }}
            />
            <input
              {...register("email")}
              placeholder="Enter Email"
              required
              type="email"
            />
            <span>{errors?.email && errors?.email?.message}</span>
          </Inputs>

          <Inputs>
            <TbSquareKey
              style={{
                marginLeft: "15px",
                fontSize: "25px",
                opacity: "0.4",
              }}
            />
            <input
              {...register("password")}
              placeholder="Password"
              required
              type="password"
            />
            <span>{errors?.password && errors?.password?.message}</span>
          </Inputs>
          <Div>
            <input
              type="checkbox"
              required
              style={{ width: "15px", height: "15px", background: "#f9f4ff" }}
            />
            <p>Always remember me</p>
          </Div>
          <Button type="submit">Log in</Button>
          <P>
            I don't have an account.
            <NavLink to="/business/register" style={{ textDecoration: "none" }}>
              <span style={{ color: "blue" }}>Create one</span>
            </NavLink>
          </P>
        </Right>
      </Container>
    </div>
  );
};

export default BizzLogin;

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

const Div = styled.div`
  display: flex;
  margin-left: 60px;
  margin-top: 20px;
  align-items: center;
  @media screen and (max-width: 960px) {
    margin: 0;
    font-size: 15px;
    width: 80%;
  }
`;

const P = styled.p`
  margin: 0;
  margin-left: 60px;
  font-size: 15px;
  margin-top: 20px;

  @media screen and (max-width: 960px) {
    margin: 0;
    font-size: 15px;
    margin-top: 10px;
    width: 80%;
  }
`;

const Inputs = styled.div`
  background-color: #f9f4ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: 430px;
  height: 80px;
  margin-bottom: 20px;
  margin-left: 60px;
  overflow: hidden;

  @media screen and (max-width: 960px) {
    margin: 0;
    width: 80%;
    margin-bottom: 20px;
  }

  input {
    flex: 1;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    margin-left: 10px;
    font-size: 18px;

    ::placeholder {
      color: #c0c0c0b3;
    }
  }
`;

const Right = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  h2 {
    margin-left: 60px;
    font-size: 36px;
    margin-bottom: 60px;
    color: #333333;
    @media screen and (max-width: 960px) {
      margin: 0;
      margin-top: 10px;
      font-size: 25px;
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width: 960px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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

  h1 {
    color: white;
    font-size: 44px;
    text-align: center;
    margin-top: 50px;
    animation: typing 4s steps(20);
    white-space: nowrap;
    overflow: hidden;

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
