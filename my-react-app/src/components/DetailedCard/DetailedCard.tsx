import { useParams } from "react-router-dom";
import s from "./detailedCards.module.css";
import { useEffect, useState } from "react";
import { fetchDetailed } from "../../api/api";
import { Animal, ResponseDeatailedType } from "../../api/api.types";
import { Loader } from "../Loader/Loader";

const DetailedCard = () => {
  const { detailId } = useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [detailedData, setDetailedData] = useState<Animal>();

  const getDetailedData = () => {
    if (!detailId) return;
    setIsFetching(true);
    fetchDetailed(detailId)
      .then((res) => res.json())
      .then((data: ResponseDeatailedType) => {
        setIsFetching(false);
        setDetailedData(data.animal);
      });
  };

  useEffect(() => {
    getDetailedData();
  }, [detailId]);

  return (
    <div>
      <div className={s.detailedWrap}>
        {isFetching ? (
          <Loader />
        ) : (
          <div>
            <div className="card-name">Name: {JSON.stringify(detailedData?.name)}</div>
            <div className="card-description">
              Small description:
              <p>earthAnimal: {detailedData?.earthAnimal ? "yes" : "no"}</p>
              <p>avian: {detailedData?.avian ? "yes" : "no"}</p>
              <p>canine: {detailedData?.canine ? "yes" : "no"}</p>
              <p>feline: {detailedData?.feline ? "yes" : "no"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailedCard;
