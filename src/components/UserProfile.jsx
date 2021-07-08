import React from "react";
import {
  userLoggedName,
  userLoggedHighScore,
  userLoggedLastGames
} from "../shared/utils";
import {
  ContainerTable,
  Divider,
  PlayerBody,
  PlayerCell,
  PlayerHead,
  PlayerHeadRow,
  PlayerRow,
  PlayerTable,
  SectionTitle
} from "./common/Common.styles";
import _ from "lodash";

const UserProfile = () => {
  const formatResults = results => {
    return (
      !_.isEmpty(results) &&
      _.map(results, res => {
        return (
          <PlayerRow>
            <PlayerCell>{`${res} ${res === 1 ? "pt" : "pts"}`}</PlayerCell>
          </PlayerRow>
        );
      })
    );
  };

  return (
    <ContainerTable>
      <SectionTitle>👋 Hi, {userLoggedName()}</SectionTitle>
      <PlayerTable>
        <PlayerHead>
          <PlayerHeadRow>High Score</PlayerHeadRow>
        </PlayerHead>
        <PlayerBody>
          <PlayerRow>
            <PlayerCell>
              {userLoggedHighScore() || "no games played yet"}
            </PlayerCell>
          </PlayerRow>
        </PlayerBody>
      </PlayerTable>
      <Divider />
      <PlayerTable>
        <PlayerHead>
          <PlayerHeadRow>Last games results</PlayerHeadRow>
        </PlayerHead>
        <PlayerBody>
          {formatResults(userLoggedLastGames()) || "no games played yet"}
        </PlayerBody>
      </PlayerTable>
    </ContainerTable>
  );
};

export default UserProfile;
