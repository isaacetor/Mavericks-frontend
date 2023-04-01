import React from "react";
import styled from "styled-components";
import loading from "../../Assets/Ripple.svg";

const Loading = () => {
  return (
    <Container>
      <img src={loading} />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000000ac;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 5;
`;
