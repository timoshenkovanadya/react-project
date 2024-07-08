import React from "react";
import { CardsBlockPropsType } from "./cardsBlock.types";
import { Loader } from "../Loader/Loader";

export class CardsBlock extends React.Component<CardsBlockPropsType> {
  render(): React.ReactNode {
    const a = 5;
    return (
      <div className="cards-block-wrap">
        {this.props.isFetching ? (
          <Loader />
        ) : (
          this.props.data?.map((item) => (
            <div className="card-container" key={item.uid}>
              <div className="card-name">Name: {JSON.stringify(item.name)}</div>
              <div className="card-description">
                Small description:
                <p>earthAnimal: {item.earthAnimal ? "yes" : "no"}</p>
                <p>avian: {item.avian ? "yes" : "no"}</p>
                <p>canine: {item.canine ? "yes" : "no"}</p>
                <p>feline: {item.feline ? "yes" : "no"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}
