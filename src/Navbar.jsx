import { IconButton, MenuItem, Select, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";
import styles from "./styles/NavbarStyles";
import { Link } from "react-router-dom";
import { useNavBarContext } from "./context/NavbarProvider";
import { withStyles } from "@mui/styles";
const Navbar = ({ showingAllColors, classes: styles }) => {
  const { changeLevel, changeFormat, level, format } = useNavBarContext();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleFormatChange = (e) => {
    changeFormat(e.target.value);
    setOpen(true);
  };
  return (
    <header className={styles.Navbar}>
      <div className={`${styles.logo} logo`}>
        <Link to="/">ReactColorPicker</Link>
      </div>
      {showingAllColors && (
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className={`${styles.slider} slider`}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onChange={changeLevel}
            />
          </div>
        </div>
      )}

      <div className={styles.selectContainer}>
        <Select value={format} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>
          <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
        </Select>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={
          <span id="message-id">Format Changed To {format.toUpperCase()}</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={[
          <IconButton
            onClick={handleClose}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </header>
  );
};

export default withStyles(styles)(Navbar);
