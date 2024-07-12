import { useState } from "react";
import "./App.css";
import { search } from "./api/api";
import { Animal, ResponseType } from "./api/api.types";
import { CardsBlock } from "./components/CardsBlock/CardsBlock";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";

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
      <SearchBlock
        searchDataHandler={searchDataHandler}
        isFetching={isFetching}
      />
      <CardsBlock data={data} isFetching={isFetching} />
    </ErrorBoundary>
  );
};

