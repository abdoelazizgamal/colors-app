import { Link, useParams } from "react-router-dom";
import ColorBox from "./ColorBox";
import { useNavBarContext } from "./context/NavbarProvider";
import { usePalettes } from "./context/PalettesProvider";
import Footer from "./Footer";
import { gatherShades, getPalette } from "./helpers/helper";
import Navbar from "./Navbar";
const SingleColorPalette = () => {
  const { palettes } = usePalettes();
  const { format } = useNavBarContext();
  const { paletteId, colorId } = useParams();
  const palette = getPalette(palettes, paletteId);
  const { paletteName, emoji } = palette;
  const shades = gatherShades(palette, colorId);
  const colorBoxes = shades.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));
  return (
    <div className="SingleColorPalette Palette">
      {/* Navbar goes here */}
      <Navbar />
      <div className="Palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox">
          <Link to={`/palette/${paletteId}`} className="copy-button">
            Go Back
          </Link>
        </div>
      </div>
      <Footer paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default SingleColorPalette;
