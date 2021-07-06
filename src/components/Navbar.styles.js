import styled from "styled-components";
import colors from "../shared/colors";

export const Container = styled.div`
  background-color: ${colors.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.text};
  width: 100%;
  a {
    width: 100%;
    text-align: center;
    padding: 12px;
    color: ${colors.text};
    text-decoration: none;
    font-size: 16px;
  }
  .active {
    border-bottom: 2px solid ${colors.text};
  }
`;
