import { createContext } from "react";
import { ThemeType } from "../app.types";

type ThemeContext = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>> | (() => void);
};

export const ThemeContext = createContext<ThemeContext>({
  theme: "dark",
  setTheme: () => {},
});
