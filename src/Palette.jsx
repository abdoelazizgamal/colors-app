import ColorBox from "./ColorBox";
import "./styles/Palette.css";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { getPalette } from "./helpers/helper";
import { useNavBarContext } from "./context/NavbarProvider";
import Footer from "./Footer";
import { usePalettes } from "./context/PalettesProvider";

const Palette = () => {
  const { palettes } = usePalettes();
  const { id } = useParams();
  const { level, format } = useNavBarContext();
  const {
    colors,
    paletteName,
    emoji,
    id: PaletteId,
  } = getPalette(palettes, id);
  const colorBoxes = colors[level]?.map((color, index) => (
    <ColorBox
      key={index}
      background={color?.[format]}
      name={color?.name}
      colorId={color.id}
      PaletteId={PaletteId}
      showingFullPalette
    />
  ));

  return (
    <div className="Palette">
      {/* Navbar goes here */}
      <Navbar showingAllColors />
      <div className="Palette-colors">
        {/* bunch of color boxes */}
        {colorBoxes}
      </div>
      <Footer paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default Palette;
