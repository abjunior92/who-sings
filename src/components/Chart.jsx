import React from "react";
import {
  PlayerTable,
  PlayerRow,
  PlayerHeadRow,
  PlayerCell,
  PlayerHead,
  PlayerBody,
  ContainerTable
} from "./common/Common.styles";
import { SectionTitle } from "./common/Common.styles";
import { getChartBestPlayers, userLoggedName } from "../shared/utils";

import _ from "lodash";

const Chart = () => {
  const formatPlayers = players => {
    return (
      !_.isEmpty(players) &&
      _.map(players, (pl, index) => {
        const isPlayerLogged = userLoggedName() === pl?.player;
        return (
          <PlayerRow key={index}>
            <PlayerCell isPlayerLogged={isPlayerLogged}>
              {getMedalFromindex(index)}
            </PlayerCell>
            <PlayerCell
              isPlayerLogged={isPlayerLogged}
            >{`${pl?.player}`}</PlayerCell>
            <PlayerCell
              isPlayerLogged={isPlayerLogged}
            >{`${pl?.score}`}</PlayerCell>
          </PlayerRow>
        );
      })
    );
  };

  const getMedalFromindex = index => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";

      default:
        return `${index + 1}º`;
    }
  };

  return (
    <ContainerTable>
      <SectionTitle>🔥 Best Players</SectionTitle>
      <PlayerTable>
        <PlayerHead>
          <PlayerRow>
            <PlayerHeadRow>#</PlayerHeadRow>
            <PlayerHeadRow>Name</PlayerHeadRow>
            <PlayerHeadRow>Score</PlayerHeadRow>
          </PlayerRow>
        </PlayerHead>
        <PlayerBody>{formatPlayers(getChartBestPlayers())}</PlayerBody>
      </PlayerTable>
    </ContainerTable>
  );
};

export default Chart;
