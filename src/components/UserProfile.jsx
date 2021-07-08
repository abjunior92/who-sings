import React from "react";
import {
  userLoggedName,
  userLoggedHighScore,
  userLoggedLastGames
} from "../shared/utils";
import { Container } from "./UserProfile.styles";
import { SectionTitle } from "./common/Common.styles";
import _ from "lodash";

const UserProfile = () => {
  const formatResults = results => {
    return (
      !_.isEmpty(results) &&
      _.map(results, res => {
        return (
          <p style={{ textAlign: "center" }}>{`${res} ${
            res === 1 ? "pt" : "pts"
          }`}</p>
        );
      })
    );
  };

  return (
    <Container>
      <SectionTitle>👋 Hi, {userLoggedName()}</SectionTitle>

      <p>
        This is your high score
        <p style={{ fontSize: "24px" }}>{userLoggedHighScore() || 0}</p>
      </p>
      <p>
        Last games results
        {formatResults(userLoggedLastGames()) || <p>no games played yet</p>}
      </p>
    </Container>
  );
};

export default UserProfile;
