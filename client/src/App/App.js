import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import ReactLoading from "react-loading";
import AuthPage from "./AuthPage/AuthPage";
import DashboardPage from "./DashboardPage/DashboardPage";
import AdminPage from "./AdminPage/AdminPage";
import classes from "./App.module.scss";

const App = () => {
  const history = useHistory();
  const [init, isInit] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      isInit(true);
    }, 1200);
    history.push("./auth");
  }, [init]);
  const [socket, setSocket] = useState();
  if (init) {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/auth" />
            </Route>
            <Route path="/auth">
              <AuthPage setSocket={setSocket} />
            </Route>
            <Route path="/dashboard">
              <DashboardPage socket={socket} />
            </Route>
            <Route path="/admin">
              <AdminPage socket={socket} />
            </Route>
          </Switch>
        </Router>
      </>
    );
  } else {
    return (
      <>
        <div className={classes.block}>
          <ReactLoading type={"bars"} color={"black"} />
        </div>
      </>
    );
  }
};

export default App;
