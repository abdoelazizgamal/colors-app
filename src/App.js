import Palette from "./Palette";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { useEffect, useState } from "react";
function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);
  return (
    <>
      <div
        className={`${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransistionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<PaletteList />} />
          <Route path="/palette/new" element={<NewPaletteForm />} />
          <Route path="/palette/:id" element={<Palette />} />
          <Route
            path="/palette/:paletteId/:colorId"
            element={<SingleColorPalette />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
