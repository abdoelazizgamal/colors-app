import { DeleteOutline } from "@mui/icons-material";
import { withStyles } from "@mui/styles";
import chroma from "chroma-js";
import styles from "./styles/DraggableColorBoxStyles";
import { SortableElement } from "react-sortable-hoc";
const DraggableColorBox = SortableElement(
  ({ color, name, classes, removeColor }) => {
    const textColor =
      chroma(color).luminance() <= 0.08
        ? "rgba(255,255,255,0.8)"
        : "rgba(0,0,0,0.6)";
    return (
      <div className={classes.root} style={{ backgroundColor: color }}>
        <div className={classes.boxContent} style={{ color: textColor }}>
          <span> {name}</span>
          <div
            onClick={(e) => {
              e.stopPropagation();
              removeColor(name);
            }}
          >
            <DeleteOutline className={classes.deleteIcon} />
          </div>
        </div>
      </div>
    );
  }
);
export default withStyles(styles)(DraggableColorBox);
