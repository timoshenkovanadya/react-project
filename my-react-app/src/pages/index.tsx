// import dynamic, { DynamicOptions } from "next/dynamic";
'use client';

import { App } from "../../src/App";

// const App = dynamic(
//   (() => import("../../src/App")) as DynamicOptions<Record<string, never>>,
//   { ssr: false, loading: () => <p>Loading...</p> },
// );

const Main = () => {
  return <App />;
};

export default Main;
