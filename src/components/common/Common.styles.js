import styled, { keyframes } from "styled-components";
import colors from "../../shared/colors";

export const SectionTitle = styled.div`
  font-weight: 400;
  color: ${colors.text};
  font-size: 50px;
  @media screen and (max-width: 480px) {
    font-size: 38px;
  }
  text-align: center;
  margin: 20px;
  display: flex;
`;
