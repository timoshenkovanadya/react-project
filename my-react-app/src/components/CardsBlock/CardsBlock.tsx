import { Loader } from "../Loader/Loader";
import { CardsBlockPropsType } from "./cardsBlock.types";

export const CardsBlock = ({ isFetching, data }: CardsBlockPropsType) => {
  return (
    <div className="cards-block-wrap">
      {isFetching ? (
        <Loader />
      ) : (
        data?.map((item) => (
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
};

