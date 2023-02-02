import { Button, CssBaseline, IconButton, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH } from "./constants";
import cssStyles from "./styles/PaletteFormNavStyles.module.css";
import { Link } from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm";

const drawerWidth = DRAWER_WIDTH;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const PaletteFormNav = ({ open, handleDrawerOpen, handleSubmit }) => {
  return (
    <div className={cssStyles.root}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className={cssStyles.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={`${cssStyles["create-palette"]}`}
          >
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={cssStyles.navBtns}>
          <PaletteMetaForm handleSubmit={handleSubmit} />
          <Link to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
};

export default PaletteFormNav;
