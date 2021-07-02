import styled from "styled-components";
import colors from "../shared/colors";

export const Container = styled.div`
  @media screen and (max-width: 480px) {
    width: 300px;
  }
  width: 600px;
  background: ${colors.cardBg};
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  position: fixed;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -60%);
  p {
    font-size: 1rem;
  }
`;

export const ButtonContainer = styled.div`
  transition: all 0.3s ease;
  :hover {
    opacity: 0.8;
  }
  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.8rem;
    width: 100%;
    height: 40px;
    margin: 5px 0;
    background: ${({ isCorrect, userClicked }) =>
      isCorrect
        ? `linear-gradient(90deg, ${colors.btnSuccess}, #b9f6ca)`
        : !isCorrect && userClicked
        ? `linear-gradient(90deg, ${colors.btnError}, #ff8a80)`
        : `linear-gradient(90deg, ${colors.btnAnswer}, #8b92c9)`};
    border: 3px solid #ffffff;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: #fff;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
  }
`;
