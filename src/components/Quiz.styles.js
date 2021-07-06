import styled, { keyframes } from "styled-components";
import colors from "../shared/colors";

export const InputName = styled.input`
  width: 300px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Greetings = styled.div`
  color: ${colors.text};
  font-weight: bold;
  font-size: 46px;
  text-align: center;
  margin: 16px;
  display: flex;
`;

export const Label = styled.label`
  color: ${colors.text};
`;

export const Header1 = styled.div`
  font-weight: 400;
  color: ${colors.text};
  font-size: 50px;
  text-align: center;
  margin: 20px;
  display: flex;
`;

export const Score = styled.div`
  font-weight: 400;
  color: ${colors.text};
  font-size: 34px;
  text-align: center;
  margin: 16px;
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

export const LoaderContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
`;

export const Loader = styled.div`
  border: 6px solid #fff;
  border-top: 6px solid ${colors.background};
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;

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

export const ButtonUpper = styled(Button)`
  text-transform: uppercase;
  width: 300px;
`;

export const ButtonLogout = styled(ButtonUpper)`
  text-transform: uppercase;
  width: 300px;
  position: fixed;
  left: 50%;
  top: 90%;
  transform: translate(-50%, -60%);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
