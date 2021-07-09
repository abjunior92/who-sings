import React from "react";
import { Container } from "./Navbar.styles";

import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BrowserView, MobileView } from "react-device-detect";
import { userLoggedName } from "../shared/utils";

const getDeviceView = (string, icon) => {
  return (
    <>
      <BrowserView>
        {string} {icon}
      </BrowserView>
      <MobileView>{icon}</MobileView>
    </>
  );
};

const Navbar = ({ user, logout }) => {
  return (
    <Container>
      <NavLink activeClassName="active" exact to="/chart">
        {getDeviceView("Chart", <FontAwesomeIcon icon="chart-line" />)}
      </NavLink>
      <NavLink activeClassName="active" exact to="/">
        {getDeviceView("Play", <FontAwesomeIcon icon="play" />)}
      </NavLink>
      {userLoggedName() && (
        <>
          <NavLink activeClassName="active" exact to="/profile">
            {getDeviceView("Profile", <FontAwesomeIcon icon="user" />)}
          </NavLink>
          <NavLink exact to="/logout" onClick={() => logout()}>
            {getDeviceView("Log out", <FontAwesomeIcon icon="sign-out-alt" />)}
          </NavLink>
        </>
      )}
    </Container>
  );
};

export default Navbar;
