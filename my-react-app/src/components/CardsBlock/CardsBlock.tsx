import React from "react";
import { CardsBlockPropsType } from "./cardsBlock.types";

export class CardsBlock extends React.Component<CardsBlockPropsType> {
  render(): React.ReactNode {
    return (
      <div className="cards-block-wrap">
        {this.props.data?.map((item) => (
          <p key={item.uid}>{JSON.stringify(item)}</p>
        ))}
      </div>
    );
  }
}
