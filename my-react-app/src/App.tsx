import React from "react";
import "./App.css";
import { search } from "./api/api";
import { ResponseType } from "./api/api.types";
import { CardsBlock } from "./components/CardsBlock/CardsBlock";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";
import { PropsType, StateType } from "./app.types";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

export class App extends React.Component<PropsType, StateType> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { data: [], isFetching: true };
  }

  searchDataHandler = (newSearch: string) => {
    this.setState((prev) => ({ ...prev, isFetching: true }));
    search(newSearch)
      .then((res) => res.json())
      .then((data: ResponseType) =>
        this.setState(() => ({ isFetching: false, data: data.animals })),
      );
  };

  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <SearchBlock
          searchDataHandler={this.searchDataHandler}
          isFetching={this.state.isFetching}
        />
        <CardsBlock data={this.state.data} isFetching={this.state.isFetching} />
      </ErrorBoundary>
    );
  }
}
