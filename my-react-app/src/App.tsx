import { MouseEventHandler, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { search } from "./api/api";
import { ResponseType } from "./api/api.types";
import s from "./app.module.css";
import { CardsBlock } from "./components/CardsBlock/CardsBlock";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { Pagination } from "./components/Pagination/Pagination";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";
import { ThemeContext } from "./context/ThemeContext";
import { ThemeType } from "./app.types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { setMaxPage, setNewPageCards } from "./store/pageSlice";

export const App = () => {
  // const [data, setData] = useState<Animal[]>([]);
  // const [maxPage, setMaxPage] = useState<string>();
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const { page, detailId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [theme, setTheme] = useState<ThemeType>("dark");

  const searchDataHandler = (newSearch: string, page: string | undefined) => {
    // if (!page) return;
    setIsFetching(true);
    // search(newSearch, page)
    //   .then((res) => res.json())
    //   .then((data: ResponseType) => {
    //     setData(data.animals);
    //     setMaxPage(data.page.totalPages.toString());
    //   });
    search(newSearch, page)
      .then((res) => res.json())
      .then((data: ResponseType) => {
        dispatch(setNewPageCards(data?.animals));
        dispatch(setMaxPage(data?.page?.totalPages?.toString()));
        setIsFetching(false);
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
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ErrorBoundary>
        {detailId && (
          <div className={s.backdrop} onClick={backdropClickHandler} />
        )}
        <SearchBlock
          searchDataHandler={searchDataHandler}
          isFetching={isFetching}
        />
        <div className={s.cardsWrap}>
          <div className={s.contentWrap}>
            <CardsBlock isFetching={isFetching} />
          </div>
          <Outlet />
        </div>
        <Pagination />
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
};
