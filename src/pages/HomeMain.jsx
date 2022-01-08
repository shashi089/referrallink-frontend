import React from "react";
import styled from "styled-components";
import TextTransition, { presets } from "react-text-transition";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import TopNavbar from "../components/TopNavbar";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 9rem;
  background: rgba(26, 32, 44, 255);
  height: 100vh;
  width: 100vw;
  ${mobile({
    width: "100vw",
  })}
`;

const MainDiv = styled.div`
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const HeaderContainer = styled.div`
  color: #0275d8;
  font-size: 4rem;
  font-weight: 700;
  text-align: center;
  ${mobile({
    fontSize: "2rem",
  })}
`;
const SContainer = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  ${mobile({
    fontSize: "1.2rem",
  })}
`;
const TContainer = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #0275d8;
  ${mobile({
    fontSize: "1.2rem",
  })}
`;

export default function HomeMain() {
  const [index, setIndex] = React.useState(0);
  const TEXTS = ["i-Phone", "i-Pad", "Mac Book", "i-Mac", "i-Watch"];

  React.useEffect(() => {
    localStorage.clear();
    const intervalId = setInterval(() => setIndex((index) => index + 1), 1500);
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <MainContainer>
      <TopNavbar />
      <MainDiv>
        <Container className="text-justify">
          <HeaderContainer> Welcome to Refer 'O' Refer</HeaderContainer>
          <SContainer>
            <p>Refer Your Friends (99) and get exclucive discounts</p>
          </SContainer>
          <TContainer>
            <TextTransition
              text={TEXTS[index % TEXTS.length]}
              springConfig={presets.wobbly}
            />
          </TContainer>
          <SContainer>
            <Link className="text-decoration-none" to="/register">
              <button className="btn btn-success">Register</button>
            </Link>
            <Link className="ms-2 text-decoration-none" to="/login">
              <button className="btn btn-secondary mx-2">Login</button>
            </Link>
          </SContainer>
        </Container>
      </MainDiv>
    </MainContainer>
  );
}
