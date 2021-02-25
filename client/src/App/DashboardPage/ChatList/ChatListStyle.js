import { makeStyles } from "@material-ui/core/styles";
import { grey, orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  row: {
    flexDirection: "column",
    overflowY: "auto",
  },
  body: {
    position: "relative",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      borderRadius: "15px",
      cursor: "pointer",
      display: "block",
    },
  },
  column: {
    padding: "15px",
    border: "5px solid transparent",
    maxWidth: "70%",
  },
  column__img: {
    minHeight: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 5px",
  },
  column__body: {
    minHeight: "70px",
    padding: "0 10px",
    position: "relative",
  },
  random: {
    width: "50px",
    height: "50px",
  },
  active: {
    border: "5px solid white",
    borderRadius: "15px",
  },
  default: {
    border: "5px solid transparent",
  },
  addChat: {
    display: "flex",
    fontSize: "45px",
    width: "350px",
    marginLeft: "20px",
    position: "fixed",
    top: "70px",
    zIndex: "20",
  },
  newChats: {
    position: "absolute",
    top: "50%",
    right: "35px",
    transform: "translateY(-50%)",
  },
  newMessages: {
    position: "absolute",
    top: "50%",
    right: "60px",
    transform: "translateY(-50%)",
  },
  leaveGroup: {
    display: "block",
    position: "absolute",
    top: "50%",
    right: "0px",
    transform: "translateY(-50%)",
  },
  deleteChat: {
    display: "block",
    position: "absolute",
    top: "50%",
    right: "0px",
    transform: "translateY(-50%)",
  },
  title: {
    position: "relative",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: "22px",
  },
  message: {
    position: "relative",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontSize: "14px",
  },
}));

export { useStyles };
