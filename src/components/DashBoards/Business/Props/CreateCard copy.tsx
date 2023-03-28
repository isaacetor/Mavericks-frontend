import React from "react";
import styled from "styled-components";
import pic from "../../.././Images/trancard.svg";

const CreateCard = () => {
  const [previewImage, setPreviewImage] = React.useState("");
  const [image, setImage] = React.useState("");
  const [colour, setColour] = React.useState("");
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState<number>(0);

  const ImageOnchange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    console.log(url);
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <Update>
            <Circle>
              <Img src={previewImage ? previewImage : pic} />
            </Circle>
            <Input onChange={ImageOnchange} id="pix" type="file" />
            <Button htmlFor="pix">Update company logo</Button>
          </Update>
          <Form>
            <Inp
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Company Name"
              type="text"
            />
            <Inp
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
              }}
              placeholder="Amount"
              type="number"
            />
            <Col>
              <Choose>Select Color</Choose>
              <Color
                onChange={(e) => {
                  setColour(e.target.value);
                }}
                type="color"
              />
            </Col>
            {name === "" || amount <= 0 || colour === "" ? (
              <Button2 bg="silver" cp="not-allowed">
                Create Card
              </Button2>
            ) : (
              <Button2 bg="blueviolet" cp="pointer">
                Create Card
              </Button2>
            )}
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
};

export default CreateCard;

const Col = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Choose = styled.div`
  color: #919191;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: 50%;
`;

const Button2 = styled.button<{ bg: string; cp: string }>`
  height: 40px;
  width: 150px;
  background-color: ${(props) => props.bg};
  color: white;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: all 350ms;
  cursor: ${(props) => props.cp};
  margin-top: 10px;
  :hover {
    transform: scale(0.95);
  }
  @media screen and (max-width: 500px) {
    width: 120px;
  }
`;

const Select = styled.select`
  border: none;
  outline: none;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  background-color: #ececec92;
  option {
    border: none;
    outline: none;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    height: 50px;
    border-radius: 10px;
    font-size: 16px;
    background-color: #ececec92;
  }
`;

const Inp = styled.input`
  border: none;
  outline: none;
  width: calc(100% - 20px);
  padding-left: 20px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  background-color: #ececec92;
`;

const Color = styled.input`
  border: none;
  outline: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ececec92;
`;

const Input = styled.input`
  display: none;
`;
const Button = styled.label`
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
  border-bottom: 1px solid #dfdedef8;
`;
const Wrapper = styled.div``;

const Container = styled.div`
  width: 70%;
  margin-top: 20px;
`;
