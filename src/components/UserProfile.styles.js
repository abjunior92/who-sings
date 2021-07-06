import styled, { keyframes } from "styled-components";
import colors from "../shared/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: ${colors.text};
    font-size: 20px;
  }
`;

export const ContainerName = styled.div`
  font-weight: 400;
  color: ${colors.text};
  font-size: 50px;
  text-align: center;
  margin: 20px;
  display: flex;
`;
