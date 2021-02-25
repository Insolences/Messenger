import { makeStyles } from "@material-ui/core/styles";
import { grey, orange } from "@material-ui/core/colors";

const useStyle = makeStyles({
  CreateGroup: {
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
    position: "absolute",
    top: "0",
    right: "0",
    "&:hover": {
      color: "#706262",
    },
    "&:active": {
      color: "#706262",
    },
  },
  row: {
    width: "100%",
    flexWrap: "nowrap",
    "& .MuiFormControl-root": {
      flexGrow: 1,
    },
  },
  group__name: {
    // "& .MuiInputBase-root": {
    //   color: orange[500],
    // },
    // "& .MuiFormLabel-root": {
    //   color: orange[500],
    // },
    // "& .MuiFormLabel-root.Mui-focused": {
    //   color: orange[500],
    // },
    // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    //   borderColor: orange[500],
    // },
    "& .MuiFormHelperText-contained": {
      color: "red",
      textAlign: "right",
    },
  },
  "@media (max-width:767px)": {
    CreateGroup: {
      width: "100%",
      padding: "0",
    },
  },
});

export default useStyle;
