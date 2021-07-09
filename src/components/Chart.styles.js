import styled from "styled-components";
import colors from "../shared/colors";

export const EmptyChartContainer = styled.div`
  font-style: 20px;
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
  color: ${colors.text};
`;
