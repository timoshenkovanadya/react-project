import { useSelector } from "react-redux";
import s from "./flyout.module.css";
import { adapterSelectors, RootState } from "../../store/store";
import { useMemo } from "react";

const Flyout = () => {
  const animals = useSelector((store: RootState) =>
    adapterSelectors.selectAll(store),
  );
  const count = useMemo(() => animals?.length, [animals]);

  if (!count) return null;
  return (
    <div className={s.wrap}>
      <div className={s.label}>{count} items are selected</div>
      <button className={s.button}>Unselect all</button>
      <button className={s.button}>Download</button>
    </div>
  );
};

export default Flyout;
