import { useState } from "react";
import { Outlet } from "react-router-dom";
import { search } from "./api/api";
import { Animal, ResponseType } from "./api/api.types";
import s from "./app.module.css";
import { CardsBlock } from "./components/CardsBlock/CardsBlock";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { Pagination } from "./components/Pagination/Pagination";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";

export const App = () => {
  const [data, setData] = useState<Animal[]>([]);
  const [maxPage, setMaxPage] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const searchDataHandler = (newSearch: string, page: string | undefined) => {
    if (!page) return;
    setIsFetching(true);
    search(newSearch, page)
      .then((res) => res.json())
      .then((data: ResponseType) => {
        setIsFetching(false);
        setData(data.animals);
        setMaxPage(data.page.totalPages.toString());
      });
  };

  return (
    <ErrorBoundary>
      <SearchBlock
        searchDataHandler={searchDataHandler}
        isFetching={isFetching}
      />
      <div className={s.contentWrap}>
        <div className={s.cardsWrap}>
          <CardsBlock data={data} isFetching={isFetching} />
          <Outlet />
        </div>
      </div>
      <Pagination maxPage={maxPage} />
    </ErrorBoundary>
  );
};
