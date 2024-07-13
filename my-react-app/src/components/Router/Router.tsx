import { Route, Routes } from "react-router-dom";
import { App } from "../../App";
import { NoMatch } from "../NoMatch/NoMatch";
import DetailedCard from "../DetailedCard/DetailedCard";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<App />} />
        <Route path="/detail/:detailId" element={<DetailedCard />} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
