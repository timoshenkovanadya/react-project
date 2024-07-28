import { MouseEventHandler, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import s from "./app.module.css";
import { ThemeType } from "./app.types";
import { CardsBlock } from "./components/CardsBlock/CardsBlock";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { Pagination } from "./components/Pagination/Pagination";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";
import { ThemeContext } from "./context/ThemeContext";
import Flyout from "./components/Flyout/Flyout";

export const App = () => {
  const { page, detailId } = useParams();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<ThemeType>("dark");

  const backdropClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    const isClickInsideDetailed = (e.target as HTMLElement).closest(
      "#detailedCard",
    );
    if (!isClickInsideDetailed) {
      navigate(`/page/${page}`);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ErrorBoundary>
        {detailId && (
          <div className={s.backdrop} onClick={backdropClickHandler} />
        )}
        <SearchBlock />
        <div className={s.cardsWrap}>
          <div
            className={theme === "dark" ? s.contentWrap : s.contentWrapLight}
          >
            <CardsBlock />
          </div>
          <Outlet />
        </div>
        <Pagination />
        <Flyout />
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
};
