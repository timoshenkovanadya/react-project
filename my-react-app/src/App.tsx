import { useState } from "react";
import "./App.css";
import { search } from "./api/api";
import { Animal, ResponseType } from "./api/api.types";
import { CardsBlock } from "./components/CardsBlock/CardsBlock";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";
import { Outlet } from "react-router-dom";

export const App = () => {
  const [data, setData] = useState<Animal[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const searchDataHandler = (newSearch: string) => {
    setIsFetching(true);
    search(newSearch)
      .then((res) => res.json())
      .then((data: ResponseType) => {
        setIsFetching(false);
        setData(data.animals);
      });
  };

  return (
    <ErrorBoundary>
      <div>
        <SearchBlock
          searchDataHandler={searchDataHandler}
          isFetching={isFetching}
        />
        <div>
          <CardsBlock data={data} isFetching={isFetching} />
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
};
