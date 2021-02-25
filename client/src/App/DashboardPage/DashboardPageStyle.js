import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  textCenter: {
    textAlign: "center",
  },
  appBarBackground: {
    backgroundColor: grey[900],
  },
  wrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  row: {
    alignItems: "center",
    height: "100%",
    ".MuiContainer-root": {
      padding: "0",
    },
  },
  body: {
    height: "calc(100vh - 64px)",
    display: "flex",
    backgroundColor: "#baa7a6",
  },
  icon: {
    display: "flex",
    justifyContent: "flex-end",
  },
  column: {
    height: "100%",
    position: "relative",
  },
  chat__column: {
    background: "rgba(224, 212, 211, 1)",
  },
  message__column: {
    background: "rgba(224, 212, 211, 0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icontest: {
    margin: "0 5px",
  },
  scroll: {
    overflowY: "scroll",
    position: "relative",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  lookchat: {
    margin: "25px 0",
    fontSize: "14px",
    backgroundColor: "#cccccc",
    borderRadius: "15px",
    padding: "5px",
  },
  lookmessage: {
    fontSize: "14px",
    backgroundColor: "#cccccc",
    borderRadius: "15px",
    padding: "5px",
  },
  popover: {
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
    },
    "& .MuiPaper-elevation8": {
      boxShadow: "none",
    },
  },
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "100%",
    },
  },
  profile_dialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "100%",
      padding: "20px",
      backgroundColor: "#d8b5a9",
    },
  },
  button: {
    position: "absolute",
    bottom: "25px",
    right: "0px",
    "& .MuiSvgIcon-root": {
      fontSize: "40px",
    },
  },
  chatButton: {
    display: "block",
    "& .MuiSvgIcon-root": {
      fontSize: "40px",
    },
  },
  groupButton: {
    display: "block",
    "& .MuiSvgIcon-root": {
      fontSize: "40px",
    },
  },
  "@media (max-width:767px)": {
    row: {
      overflow: "hidden",
    },
    chatList: {
      height: "100%",
      display: "none",
    },
    messageList: {
      height: "100%",
      display: "block",
    },
    profile_dialog: {
      "& .MuiDialog-paperWidthSm": {
        width: "70%",
        padding: "20px",
        backgroundColor: "#d8b5a9",
      },
    },
    chat_dialog: {
      "& .MuiDialog-paperWidthSm": {
        width: "100%",
        padding: "25px",
      },
    },
    group_dialog: {
      "& .MuiDialog-paperWidthSm": {
        width: "70%",
        padding: "25px",
      },
    },
  },
}));

export { useStyles };
