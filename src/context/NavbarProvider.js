import { createContext, useContext, useState } from "react";

const NavBarContext = createContext({
  level: null,
  format: null,
  changeLevel: () => {},
  changeFormat: () => {},
});
const NavbarProvider = ({ children }) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");
  const changeLevel = (value) => {
    setLevel(value);
  };
  const changeFormat = (val) => {
    setFormat(val);
  };
  return (
    <NavBarContext.Provider
      value={{ level, format, changeFormat, changeLevel }}
    >
      {children}
    </NavBarContext.Provider>
  );
};
export const useNavBarContext = () => useContext(NavBarContext);
export default NavbarProvider;
