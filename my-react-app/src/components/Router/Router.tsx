import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import { NoMatch } from "../NoMatch/NoMatch";
import { App } from "../../App";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />
        {/* <Route path="about" element={<About />} />
      <Route path="dashboard" element={<Dashboard />} /> */}

        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
