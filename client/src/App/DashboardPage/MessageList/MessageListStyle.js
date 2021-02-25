import { makeStyles } from "@material-ui/core/styles";
import { grey, orange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  row: {
    height: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
    background: "#d6c8c8",
  },
  text__area: {
    flexBasis: "85%",
    overflowY: "hidden",
    position: "relative",
  },
  arrow: {
    position: "absolute",
    left: "0",
    top: "15px",
  },
  paper: {
    padding: "15px 15px 0 15px",
    background: "#d6c8c8",
    height: "95%",
    overflowY: "scroll",
    paddingBottom: "5px",
  },
  button__area: {
    padding: "0 15px 15px 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexBasis: "15%",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input__area: {
    width: "90%",
    "&.MuiInput-underline:after": {
      borderBotom: "2px solid white",
    },
  },
  column__img: {
    minHeight: "70px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0 40px",
  },
  column__body: {
    minHeight: "70px",
    padding: "0 5px",
    background: "white",
    borderRadius: "10px",
    position: "relative",
    "&:before": {
      content: "''",
      position: "absolute",
      top: "12.5px",
      left: "-10px",
      width: 0,
      height: 0,
      borderTop: "5px solid transparent",
      borderRight: "10px solid #ffffff",
      borderBottom: "5px solid transparent",
    },
  },
  own: {
    justifyContent: "flex-end",
    marginTop: "5px",
  },
  notOwn: {
    justifyContent: "flex-start",
    marginTop: "5px",
  },
  column__nickname: {
    fontSize: "12px",
    fontStyle: "italic",
  },
  column__text: {
    wordBreak: "break-all",
    fontSize: "14px",
  },
}));

export { useStyles };
