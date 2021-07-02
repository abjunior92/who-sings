import styled, { createGlobalStyle, keyframes } from "styled-components";
import colors from "./shared/colors";

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background-color: ${colors.background};
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
  }
`;

export const Header1 = styled.div`
  font-family: Roboto;
  font-weight: 400;
  color: ${colors.text};
  font-size: 50px;
  text-align: center;
  margin: 20px;
  display: flex;
`;

export const Button = styled.button`
  cursor: pointer;
  background: ${colors.buttonStartBg};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  height: 40px;
  margin: 20px 0;
  padding: 0 40px;
`;

export const Loader = styled.div`
  border: 6px solid #fff;
  border-top: 6px solid ${colors.background};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
  position: fixed;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -60%);

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ButtonNext = styled(Button)``;

export const ButtonStart = styled(Button)`
  text-transform: uppercase;
  max-width: 300px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    color: #fff;
  }
  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }
`;
