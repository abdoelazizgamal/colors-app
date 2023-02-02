import { generatePalette } from "../colorHelpers";

export const gatherShades = (palette, colorToFilterBy) => {
  let shades = [];
  let allColors = palette.colors;

  for (let key in allColors) {
    shades = shades.concat(
      allColors[key].filter((color) => color.id === colorToFilterBy)
    );
  }
  //return all shades of given color
  return shades.slice(1);
};
export const getPalette = (colors, paletteId) => {
  const findPalette = colors.find((palette) => palette.id === paletteId);
  const palette = generatePalette(findPalette);
  return palette;
};

export const syncLocalStorage = (palettes) =>
  window.localStorage.setItem("palettes", JSON.stringify(palettes));
