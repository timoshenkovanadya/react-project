import React from "react";
import s from "./loader.module.css";

export class Loader extends React.Component {
  render(): React.ReactNode {
    return (
      <div className={s.loaderWrapper}>
        <div className={s.loader}></div>
      </div>
    );
  }
}
