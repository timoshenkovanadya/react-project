import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetailed } from "../../api/api";
import { Animal, ResponseDeatailedType } from "../../api/api.types";
import { Loader } from "../Loader/Loader";
import s from "./detailedCards.module.css";

const DetailedCard = () => {
  const { detailId, page } = useParams();
  const [isFetching, setIsFetching] = useState(true);
  const [detailedData, setDetailedData] = useState<Animal>();
  const navigate = useNavigate();

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

  const closeHandler = () => {
    navigate(`/page/${page}`);
  };

  return (
    <>
      <div id="detailedCard">
        <div className={s.detailedWrap}>
          {isFetching ? (
            <Loader />
          ) : (
            <div className={s.descriptionWrap}>
              <div>
                <p>Name: {detailedData?.name}</p>
                <p>earthAnimal: {detailedData?.earthAnimal ? "yes" : "no"}</p>
                <p>avian: {detailedData?.avian ? "yes" : "no"}</p>
                <p>canine: {detailedData?.canine ? "yes" : "no"}</p>
                <p>feline: {detailedData?.feline ? "yes" : "no"}</p>
              </div>
              <div onClick={closeHandler} className={s.close} data-testid="close-button" ></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailedCard;
