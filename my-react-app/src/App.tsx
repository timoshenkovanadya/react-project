import { MouseEventHandler, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
  const { page, detailId } = useParams();
  const navigate = useNavigate();

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

  const backdropClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    const isClickInsideDetailed = (e.target as HTMLElement).closest(
      "#detailedCard",
    );
    if (!isClickInsideDetailed) {
      navigate(`/page/${page}`);
    }
  };

  return (
    <ErrorBoundary>
    {detailId && <div className={s.backdrop} onClick={backdropClickHandler} />}
      <SearchBlock
        searchDataHandler={searchDataHandler}
        isFetching={isFetching}
      />
      <div className={s.cardsWrap}>
        <div className={s.contentWrap}>
          <CardsBlock data={data} isFetching={isFetching} />
        </div>
        <Outlet />
      </div>
      <Pagination maxPage={maxPage} />
    </ErrorBoundary>
  );
};
