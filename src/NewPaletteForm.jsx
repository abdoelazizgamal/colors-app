import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useNavigate } from "react-router-dom";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import { DRAWER_WIDTH } from "./constants";
import { usePalettes } from "./context/PalettesProvider";
import { seedColors } from "./seedColors";
const drawerWidth = DRAWER_WIDTH;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NewPaletteForm = () => {
  const theme = useTheme();
  const { savePalette, palettes } = usePalettes();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState("teal");
  const [colors, setColors] = React.useState(seedColors[0].colors);
  const [newColorName, setNewColorName] = React.useState("");
  const maxColors = 20;
  const paletteIsFull = colors.length >= maxColors;
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const updateColor = (value) => {
    setCurrentColor(value.hex);
  };
  const addColor = () => {
    setColors([...colors, { name: newColorName, color: currentColor }]);
  };
  const handleNewColorChange = (e) => {
    setNewColorName(e.target.value);
  };
  React.useEffect(() => {
    if (window.innerWidth < 768) {
      handleDrawerClose();
    }
    const handleResize = () => {
      if (window.innerWidth < 768) {
        handleDrawerClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleSubmit = ({ paletteName, emoji }) => {
    const newPalette = {
      paletteName: paletteName,
      emoji: emoji,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
    savePalette(newPalette);
    navigate("/");
  };
  const removeColor = (colorName) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color.name !== colorName)
    );
  };
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== currentColor)
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors((colors) => arrayMove(colors, oldIndex, newIndex));
  };
  const addRandomColor = () => {
    //pick random color from existing palettes
    const allColors = palettes.map((p) => p.colors).flat();
    // var rand = Math.floor(Math.random() * allColors.length);
    // const randomColor = allColors[rand];
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        // eslint-disable-next-line no-loop-func
        (color) => color.name === randomColor.name
      );
    }
    setColors([...colors, randomColor]);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            style={{ marginBottom: "10px", textAlign: "center" }}
          >
            Design Your Palette
          </Typography>
          <div
            style={{ justifyContent: "center", display: "flex", gap: "5px" }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setColors([])}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            currentColor={currentColor}
            updateColor={updateColor}
            addColor={addColor}
            newColorName={newColorName}
            handleNewColorChange={handleNewColorChange}
            paletteIsFull={paletteIsFull}
          />
        </div>
      </Drawer>
      <Main open={open} style={{ height: "calc(100vh - 64px)", fontSize: "0" }}>
        <DrawerHeader />
        <DraggableColorList
          removeColor={removeColor}
          colors={colors}
          axis="xy"
          onSortEnd={onSortEnd}
          setColors={setColors}
          pressDelay={150}
        />
      </Main>
    </Box>
  );
};
export default NewPaletteForm;
