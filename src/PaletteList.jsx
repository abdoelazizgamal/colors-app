import { withStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { usePalettes } from "./context/PalettesProvider";
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyle";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DeleteDialogConfirm from "./DeleteDialogConfirm";
import { useState } from "react";
const PaletteList = ({ classes }) => {
  const [show, setShow] = useState(false);
  const [id, setID] = useState(null);
  const { palettes } = usePalettes();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map((palette) => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette {...palette} setShow={setShow} setID={setID} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <DeleteDialogConfirm
        show={show}
        setShow={setShow}
        id={id}
        setID={setID}
      />
    </div>
  );
};

export default withStyles(styles)(PaletteList);
