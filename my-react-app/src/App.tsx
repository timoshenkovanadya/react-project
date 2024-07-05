import React from "react";
import "./App.css";
import { CardsBlock } from "./components/CardsBlock/CardsBlock";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";
import { search } from "./api/api";

type PropsType = Record<string, never>;
type StateType = { data: string[] };

export class App extends React.Component<PropsType, StateType> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { data: [] };
  }

  searchDataHandler = (newSearch: string) => {
    search(newSearch)
      .then((res) => res.json())
      .then((data) => this.setState((prev) => ({ ...prev, data: data.animals })));
  };

  render(): React.ReactNode {
    return (
      <div>
        <SearchBlock searchDataHandler={this.searchDataHandler}/>
        <CardsBlock data={this.state.data} />
      </div>
    );
  }
}
