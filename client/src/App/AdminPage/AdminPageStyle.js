import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: grey[900],
    height: "100vh",
  },
  menu: {
    [theme.breakpoints.up("sm")]: {
      width: menuWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${menuWidth}px)`,
      marginLeft: menuWidth,
    },
    backgroundColor: "#e0d4d3",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  menuPaper: {
    width: menuWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));
const menuWidth = 240;

export { useStyles };
