import s from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={s.loaderWrapper}>
      <div className={s.loader}></div>
    </div>
  );
};

