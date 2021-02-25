import { makeStyles } from "@material-ui/core/styles";
import { grey, orange } from "@material-ui/core/colors";

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
  },
  row: {
    alignItems: "center",
    ".MuiContainer-root": {
      padding: "0",
    },
  },
  body: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#e0d4d3",
  },
  img: {
    margin: theme.spacing(1),
    backgroundColor: "#e0d4d3",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: grey[900],
    padding: "15px",
    borderRadius: "15px",
  },
  title: {
    color: orange[500],
  },
  input: {
    "& .MuiInputBase-root": {
      color: orange[500],
    },
    "& .MuiFormLabel-root": {
      color: orange[500],
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: orange[500],
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: orange[500],
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "orange",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: orange[500],
    },
    "& .MuiFormHelperText-contained": {
      color: "red",
      textAlign: "right",
    },
  },
  inputError: {
    "& .MuiInputBase-root": {
      color: orange[500],
    },
    "& .MuiFormLabel-root": {
      color: orange[500],
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: orange[500],
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: orange[500],
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "orange",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "& .MuiFormHelperText-contained": {
      color: "red",
      textAlign: "right",
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "black",
    backgroundColor: orange[500],
  },
}));

export { useStyles };
