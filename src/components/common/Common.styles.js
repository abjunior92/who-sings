import styled from "styled-components";
import colors from "../../shared/colors";

export const SectionTitle = styled.div`
  font-weight: 400;
  color: ${colors.text};
  font-size: 50px;
  text-align: center;
  margin: 20px;
  display: flex;
  @media screen and (max-width: 480px) {
    font-size: 38px;
  }
`;

export const Divider = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ContainerTable = styled.div`
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
  background: ${props => (props.isPlayerLogged ? colors.text : colors.blue)};
  color: ${props => (props.isPlayerLogged ? colors.textBlack : colors.text)};
  font-weight: ${props => (props.isPlayerLogged ? "bold" : "400")};
`;

export const PlayerHead = styled.thead``;

export const PlayerBody = styled.tbody``;

export const PlayerHeadRow = styled.th`
  background: ${colors.text};
  border-bottom: 4px solid ${colors.blue};
  padding: 8px;
`;
