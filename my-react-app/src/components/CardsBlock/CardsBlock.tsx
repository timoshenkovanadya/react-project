import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { RootState } from "../../store/store";
import { Loader } from "../Loader/Loader";

export const CardsBlock = () => {
  const data = useSelector((store: RootState) => store.page.cards);
  const { theme } = useContext(ThemeContext);
  const isFetching = useSelector((state: RootState) => state.page.isFetching);

  return (
    <div
      className={
        theme === "dark" ? "cards-block-wrap" : "cards-block-wrap-light"
      }
    >
      {isFetching ? (
        <Loader />
      ) : (
        data?.map((item) => (
          <Link
            className={
              theme === "dark"
                ? "link card-container"
                : "link card-container-light"
            }
            key={item.uid}
            to={`detail/${item.uid}`}
          >
            <div className="card-name">Name: {JSON.stringify(item.name)}</div>
            <div className="card-description">
              Small description:
              <p>earthAnimal: {item.earthAnimal ? "yes" : "no"}</p>
              <p>avian: {item.avian ? "yes" : "no"}</p>
              <p>canine: {item.canine ? "yes" : "no"}</p>
              <p>feline: {item.feline ? "yes" : "no"}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};
