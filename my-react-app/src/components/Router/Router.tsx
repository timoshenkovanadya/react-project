import { Route, Routes } from "react-router-dom";
import { App } from "../../App";
import { NoMatch } from "../NoMatch/NoMatch";
import DetailedCard from "../DetailedCard/DetailedCard";
import { Redirect } from "../Redirect/Redirect";

export const Router = () => {
  return (
    <Routes>
      <Route path="/page/:page/" element={<App />}>
        <Route path="detail/:detailId" element={<DetailedCard />} />
      </Route>
      <Route path="/" element={<Redirect />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
