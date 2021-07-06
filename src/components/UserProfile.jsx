import React from "react";
import { userLoggedName } from "../shared/utils";
import { ContainerName, Container } from "./UserProfile.styles";

const UserProfile = () => {
  return (
    <Container>
      <ContainerName>👋 Hi, {userLoggedName()}</ContainerName>

      <p>This is your high score: </p>
      <p>Last games results: </p>
    </Container>
  );
};

export default UserProfile;
