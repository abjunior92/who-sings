import styled, { keyframes } from "styled-components";
import colors from "../shared/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  td {
    font-size: 20px;
  }
  th {
    font-weight: bold;
    font-size: 24px;
  }
  @media screen and (max-width: 480px) {
    td {
      font-size: 16px;
    }
    th {
      font-size: 20px;
    }
  }
`;

export const PlayerTable = styled.table`
  width: 80%;
  text-align: center;
  padding: 8px;
  border-spacing: 0px;
  border-collapse: collapse;
  overflow: hidden;
  border-radius: 10px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

export const PlayerRow = styled.tr``;

export const PlayerCell = styled.td`
  padding: 8px;
  border-bottom: 2px solid ${colors.blue};
  background: ${colors.text};
`;

export const PlayerHead = styled.thead``;

export const PlayerBody = styled.tbody``;

export const PlayerHeadRow = styled.th`
  background: ${colors.text};
  border-bottom: 4px solid ${colors.blue};
  padding: 8px;
`;
