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
      _.map(results, (res, index) => {
        return (
          <PlayerRow key={index}>
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
          <PlayerRow>
            <PlayerHeadRow>High Score</PlayerHeadRow>
          </PlayerRow>
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
          <PlayerRow>
            <PlayerHeadRow>Last games results</PlayerHeadRow>
          </PlayerRow>
        </PlayerHead>
        <PlayerBody>
          {formatResults(userLoggedLastGames()) || (
            <PlayerCell>no games played yet</PlayerCell>
          )}
        </PlayerBody>
      </PlayerTable>
    </ContainerTable>
  );
};

export default UserProfile;
