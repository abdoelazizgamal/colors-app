import { createContext, useContext, useEffect, useState } from "react";
import { syncLocalStorage } from "../helpers/helper";
import { seedColors } from "../seedColors";

const PalettesContext = createContext({
  palettes: [],
  newPaletteName: "",
  savePalette: () => {},
  setPalettes: () => {},
  handleNewPaletteChange: () => {},
});
const PalettesProvider = ({ children }) => {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedColors);
  const [newPaletteName, setNewPaletteName] = useState("");
  const handleNewPaletteChange = (e) => {
    setNewPaletteName(e.target.value);
  };
  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };
  const deletePalette = (e, id) => {
    e.stopPropagation();
    setPalettes(palettes.filter((palette) => palette.id !== id));
  };
  useEffect(() => {
    syncLocalStorage(palettes);
  }, [palettes]);
  return (
    <PalettesContext.Provider
      value={{
        savePalette,
        setPalettes,
        palettes,
        newPaletteName,
        handleNewPaletteChange,
        setNewPaletteName,
        deletePalette,
      }}
    >
      {children}
    </PalettesContext.Provider>
  );
};
export const usePalettes = () => useContext(PalettesContext);
export default PalettesProvider;
