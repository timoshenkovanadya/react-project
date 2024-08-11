import s from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={s.loaderWrapper} data-testid="loader" >
      <div className={s.loader}></div>
    </div>
  );
};

