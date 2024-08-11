'use client'

import { useContext } from "react";
import s from "./themeToggle.module.css";
import { ThemeContext } from "../../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <>
    <div> switch theme
      <input
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={s.switchCheckbox}
        id={`switch`}
        type="checkbox"
      />
      <label
        style={{ background: theme === "dark" ? "" : "#d5d9db" }}
        className={s.switchLabel}
        htmlFor={`switch`}
      >
        <span className={s.switchButton} />
      </label>
    </div>
      
    </>
  );
};
