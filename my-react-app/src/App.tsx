"use client";

import { MouseEventHandler, useState } from "react";
import { Provider } from "react-redux";
import s from "./app.module.css";
import { ThemeType } from "./app.types";
import { CardsBlock } from "./components/CardsBlock/CardsBlock";
import DetailedCard from "./components/DetailedCard/DetailedCard";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import Flyout from "./components/Flyout/Flyout";
import { Pagination } from "./components/Pagination/Pagination";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";
import { ThemeContext } from "./context/ThemeContext";
import { store } from "./store/store";
import { useRouter } from "next/router";

export const App = () => {
  const router = useRouter();

  const [theme, setTheme] = useState<ThemeType>("dark");
  const page = router.query.page;
  const detailId = router.query.detailedId;

  const backdropClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    const isClickInsideDetailed = (e.target as HTMLElement).closest(
      "#detailedCard",
    );
    if (!isClickInsideDetailed) {
      router.push(`/page/${page || "1"}`);
    }
  };

  return (
    <Provider store={store}>
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
            {detailId && <DetailedCard />}
          </div>
          <Pagination />
          <Flyout />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </Provider>
  );
};
