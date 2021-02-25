import { React, useState, useEffect } from "react";
import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Logo from "../../components/Logo/Logo";
import { useStyles } from "./AuthPageStyle";
import { io } from "socket.io-client";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import API from "../../services/API";
import { Notification } from "../../components/Notifications";

const AuthPage = ({ setSocket }) => {
  const setConnection = (token) => {
    setSocket(
      io.connect("http://localhost:5000", {
        transports: ["websocket"],
        extraHeaders: { token: localStorage.getItem("token") },
        query: {
          token,
        },
      })
    );
  };
  const classes = useStyles();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [serverErrorMessage, setServerError] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();
  const [auth2, setAuth] = useState(null);
  useEffect(async () => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_ID,
          scope: "profile email",
        })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance());
        });
    });

    const res = await API.verifyToken();
    if (res.status !== 200) {
      return null;
    }
    setConnection(localStorage.getItem("token"));
    history.push("/dashboard");
  }, []);

  const handleClose = () => {
    setError(false);
  };

  const responseGoogle = async () => {
    const res = await API.responseGoogle(auth2);
    if (res.error) {
      setError(true);
      setServerError(res.error);
      return null;
    }
    if (res.response && res.response.status === 403) {
      setError(true);
      setServerError("Вас забанили");
      return null;
    }
    // console.log("responseGoogle: ", res);
    const { token } = res.data;
    localStorage.setItem("token", token);
    setConnection(token);
    history.push("/dashboard");
  };
  const responseFacebook = async (response) => {
    if (response.status !== 200) {
      setError(true);
      setServerError("Что то пошло не так...");
      return null;
    }
    const res = await API.responseFacebook(response);
    if (res.status !== 200) {
      setServerError("Нет связи с сервером");
      return null;
    }
    const { token } = res.data;
    localStorage.setItem("token", token);
    history.push("/dashboard");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await API.getSession(login, password);
    if (res.status !== 200) {
      setError(true);
      setServerError(res.body.message);
      return null;
    }
    const { token } = res.body;
    localStorage.setItem("token", token);
    setConnection(token);
    history.push("/dashboard");
  };
  return (
    <>
      {error && (
        <Notification message={serverErrorMessage} handleClose={handleClose} />
      )}
      <Box className={classes.wrapper}>
        <AppBar position="static" className={classes.appBarBackground}>
          <Container fixed>
            <Toolbar>
              <Grid container className={classes.row}>
                <Grid item sm={3} xs={6}>
                  <Logo />
                </Grid>
                <Grid item sm={6} xs={6} className={classes.textCenter}>
                  <Typography variant="h6">Messenger</Typography>
                </Grid>
                <Grid item sm={3} xs={false}></Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        <Box className={classes.body}>
          <Container>
            <Grid container className={classes.content}>
              <Grid item xs={12} sm={5}>
                <div className={classes.paper}>
                  <Avatar className={classes.img}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography
                    component="h1"
                    variant="h5"
                    className={(classes.textCenter, classes.title)}
                  >
                    Login
                  </Typography>
                  <form className={classes.form} noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="login"
                      label="Login"
                      name="login"
                      autoComplete="login"
                      autoFocus
                      className={classes.input}
                      onChange={(event) => setLogin(event.currentTarget.value)}
                      value={login || ""}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      className={error ? classes.inputError : classes.input}
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
                      value={password || ""}
                      helperText={error ? serverErrorMessage : ""}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      className={classes.submit}
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                  </form>
                </div>
                <Box width="auto" display="flex" justifyContent="space-around">
                  <GoogleLoginButton onClick={responseGoogle} />
                  <FacebookLogin
                    appId={process.env.REACT_APP_FACEBOOK_ID}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    render={(renderProps) => (
                      <FacebookLoginButton
                        onClick={renderProps.onClick}
                      ></FacebookLoginButton>
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AuthPage;
