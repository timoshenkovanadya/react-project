import React from "react";
import { CardsBlockPropsType } from "./cardsBlock.types";

export class CardsBlock extends React.Component<CardsBlockPropsType> {
  render(): React.ReactNode {
    return (
      <div className="cards-block-wrap">
        {this.props.hhhdata?.map((item) => (
          <div className="card-container" key={item.uid}>
            <div className="card-name">Name: {JSON.stringify(item.name)}</div>
            <div className="card-description">
              Small description:
              <p>earthAnimal: {JSON.stringify(item.earthAnimal)}</p>
              <p>avian: {JSON.stringify(item.avian)}</p>
              <p>canine: {JSON.stringify(item.canine)}</p>
              <p>feline: {JSON.stringify(item.feline)}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
