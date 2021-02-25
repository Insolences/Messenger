import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles({
  Profile: {
    width: "30vw",
    color: "#393030",
    textAlign: "center",
  },

  close: {
    display: "block",
    marginLeft: "auto",
    cursor: "pointer",
    "&:hover": {
      color: "#ece6e6",
    },
    "&:active": {
      color: "#ece6e6",
    },
  },

  photo: {
    height: "100px",
    width: "100px",
    backgroundColor: "#635d5d",
    margin: "5px auto",
  },
  download: {
    width: "0",
  },

  nameForm: {
    width: "100%",
    // height: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    "& .MuiFormControl-root": {
      marginTop: "10px",
      width: "75%",
    },
  },
  button: {
    marginTop: "10px",
    width: "75%",
    fontSize: "13px",
    marginBottom: "30px",
  },
  "@media (max-width:767px)": {
    Profile: {
      width: "100%",
      height: "100%",
    },
    nameForm: {
      // height: "250px",
    },
    button: {
      marginBottom: "30px",
    },
  },
});

export default useStyle;
