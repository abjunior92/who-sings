import styled, { keyframes } from "styled-components";
import colors from "../shared/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    text-align: center;
    color: ${colors.text};
    font-size: 20px;
  }
`;
