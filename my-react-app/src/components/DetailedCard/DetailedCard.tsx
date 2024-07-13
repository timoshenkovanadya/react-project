import { useParams } from "react-router-dom";

const DetailedCard = () => {
  const { detailId } = useParams();
  console.log(detailId, "detailId");
  return <div>DetailedCard</div>;
};

export default DetailedCard;
