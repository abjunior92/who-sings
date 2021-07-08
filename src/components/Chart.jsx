import React from "react";
import {
  Container,
  PlayerTable,
  PlayerRow,
  PlayerHeadRow,
  PlayerCell,
  PlayerHead,
  PlayerBody
} from "./Chart.styles";
import { SectionTitle } from "./common/Common.styles";
import { getChartBestPlayers } from "../shared/utils";

import _ from "lodash";

const Chart = () => {
  const formatPlayers = players => {
    return (
      !_.isEmpty(players) &&
      _.map(players, pl => {
        return (
          <PlayerRow>
            <PlayerCell>{`${pl?.player}`}</PlayerCell>
            <PlayerCell>{`${pl?.score}`}</PlayerCell>
          </PlayerRow>
        );
      })
    );
  };

  return (
    <Container>
      <SectionTitle>🔥 Best Players</SectionTitle>
      <PlayerTable>
        <PlayerHead>
          <PlayerHeadRow>Name</PlayerHeadRow>
          <PlayerHeadRow>Score</PlayerHeadRow>
        </PlayerHead>
        <PlayerBody>{formatPlayers(getChartBestPlayers())}</PlayerBody>
      </PlayerTable>
    </Container>
  );
};

export default Chart;
