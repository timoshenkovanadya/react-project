import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { cardsService } from "../../api/cardsService";
import { RootState } from "../../store/store";
import { Loader } from "../Loader/Loader";
import s from "./detailedCards.module.css";

const DetailedCard = () => {
  const router = useRouter();
  const page = router.query.page as string | undefined;
  const detailId = router.query.detailedId as string | undefined;
  const detailedData = useSelector((state: RootState) => state.detailed.card);
  const { isFetching } = cardsService.useGetDetailedQuery(detailId!, {
    skip: !detailId,
    refetchOnMountOrArgChange: true,
  });

  const closeHandler = () => {
    router.push(`/page/${page}`);
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
              <div
                onClick={closeHandler}
                className={s.close}
                data-testid="close-button"
              ></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailedCard;
