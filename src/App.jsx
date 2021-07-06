import React, { useState, useEffect } from "react";
// Router
import { Switch, Route, Redirect } from "react-router-dom";
// Components
import UserProfile from "./components/UserProfile";
import Chart from "./components/Chart";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";

import { GlobalStyle, Container } from "./App.styles";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faUser,
  faChartLine,
  faQuestion,
  faSignOutAlt,
  faPlay
} from "@fortawesome/free-solid-svg-icons";

import { useLocalStorage } from "./hooks/localStorageHook";

library.add(
  faCheckSquare,
  faUser,
  faChartLine,
  faQuestion,
  faPlay,
  faSignOutAlt
);

const App = () => {
  const [userLogged, setUserLogged, deleteUserLogged] =
    useLocalStorage("userLogged");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUserLogged({ ...userLogged, ...user });
  }, [user]);

  useEffect(() => {
    setUser(userLogged);
  }, []);

  const logout = () => {
    deleteUserLogged();
    window.location.href = "/";
  };
  return (
    <>
      <GlobalStyle />
      <Container>
        <Navbar user={userLogged} logout={logout} />
        <Switch>
          <Route
            path="/profile"
            render={() => {
              return <UserProfile />;
            }}
          ></Route>
          <Route
            path="/chart"
            render={() => {
              return <Chart />;
            }}
          ></Route>
          <Route
            path="/"
            render={() => {
              return <Quiz user={userLogged} setUser={user => setUser(user)} />;
            }}
          ></Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
