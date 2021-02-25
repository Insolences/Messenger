import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  CreateChat: {
    padding: "25px",
    height: "65vh",
    backgroundColor: "#fff",
    color: "#000",
    position: "relative",
    textAlign: "center",
    overflowY: "scroll",
  },
  close: {
    fontSize: "30px",
    top: "0",
    right: "0",
    position: "absolute",
    "&:hover": {
      color: "#706262",
    },
    "&:active": {
      color: "#706262",
    },
  },
  list: {
    backgroundColor: "black",
    height: "85%",
    marginTop: "1%",
  },
  "@media (max-width:767px)": {
    CreateChat: {
      width: "100%",
      padding: "0",
      height: "65vh",
    },
  },
});

export default useStyle;
