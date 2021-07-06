import styled, { createGlobalStyle } from "styled-components";
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
  body #root{
    width: 50%;
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
  }
`;

export const Container = styled.div``;
