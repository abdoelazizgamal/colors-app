import { withStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import styles from "./styles/MiniPaletteStyle";

import { Delete } from "@mui/icons-material";
import { memo } from "react";
const MiniPalette = memo(
  ({ classes, paletteName, emoji, colors, id, setShow, setID }) => {
    const navigate = useNavigate();
    const miniColorBoxes = colors.map((color) => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));
    const goToPalette = () => {
      navigate(`palette/${id}`);
    };
    const handleDeletConfirm = (e) => {
      e.stopPropagation();
      setShow(true);
      setID(id);
    };
    return (
      <div className={classes.root} onClick={goToPalette}>
        <div className={classes.delete} onClick={handleDeletConfirm}>
          <Delete
            className={classes.deleteIcon}
            style={{ transition: "all 0.3s ease-in-out" }}
          />
        </div>
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
);

export default withStyles(styles)(MiniPalette);
