import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import s from "./app.module.css";
import { ThemeType } from "./app.types";
import { CardsBlock } from "./components/CardsBlock/CardsBlock";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import Flyout from "./components/Flyout/Flyout";
import { Pagination } from "./components/Pagination/Pagination";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";
import { ThemeContext } from "./context/ThemeContext";

export const App = () => {
  const { page, detailId } = useParams();
  const router = useRouter();

  const [theme, setTheme] = useState<ThemeType>("dark");

  const backdropClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    const isClickInsideDetailed = (e.target as HTMLElement).closest(
      "#detailedCard",
    );
    if (!isClickInsideDetailed) {
      router.push(`/page/${page}`);
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
