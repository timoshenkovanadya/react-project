import React from "react";
import "./App.css";
import { CardsBlock } from "./components/CardsBlock/CardsBlock";
import { SearchBlock } from "./components/SearchBlock/SearchBlock";

export class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <SearchBlock />
        <CardsBlock data={["apple", "orange", "pineapple"]} />
      </div>
    );
  }
}
