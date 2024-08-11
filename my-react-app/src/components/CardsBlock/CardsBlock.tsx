'use client'

import { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../context/ThemeContext";
import { RootState } from "../../store/store";
import { Loader } from "../Loader/Loader";
import { CardCheckbox } from "../CardCheckbox/CardCheckbox";
import Link from "next/link";
import { useRouter } from "next/router";

export const CardsBlock = () => {
  const router = useRouter();
  const data = useSelector((store: RootState) => store.page.cards);
  const page = router.query.slug?.[0];
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
            href={`${page}/${item.uid}`}
          >
            <div className="card-name">Name: {JSON.stringify(item.name)}</div>
            <div className="card-description">
              Small description:
              <p>earthAnimal: {item.earthAnimal ? "yes" : "no"}</p>
              <p>avian: {item.avian ? "yes" : "no"}</p>
              <p>canine: {item.canine ? "yes" : "no"}</p>
              <p>feline: {item.feline ? "yes" : "no"}</p>
            </div>
            <CardCheckbox animal={item} />
          </Link>
        ))
      )}
    </div>
  );
};
