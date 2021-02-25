import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: "20px",
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#c8abab",
    },
  },
}));

export default useStyles;
