import { useDispatch, useSelector } from "react-redux";
import s from "./flyout.module.css";
import { adapterSelectors, RootState, toggleSelected } from "../../store/store";
import { useCallback, useMemo } from "react";

const Flyout = () => {
  const dispatch = useDispatch();
  const animals = useSelector((store: RootState) =>
    adapterSelectors.selectAll(store),
  );
  const count = useMemo(() => animals?.length, [animals]);
  const unselectHandler = useCallback(() => {
    animals.forEach((animal) => dispatch(toggleSelected(animal)));
  }, [animals]);

  if (!count) return null;
  return (
    <div className={s.wrap}>
      <div className={s.label}>{count} items are selected</div>
      <button className={s.button} onClick={unselectHandler}>
        Unselect all
      </button>
      <button className={s.button}>Download</button>
    </div>
  );
};

export default Flyout;
