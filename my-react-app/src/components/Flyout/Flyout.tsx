import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adapterSelectors, RootState, toggleSelected } from "../../store/store";
import s from "./flyout.module.css";
import { convertToCSV } from "./flyout.helpers";
import { ThemeContext } from "../../context/ThemeContext";

const Flyout = () => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const [csvURL, setCsvURL] = useState<string>();
  const animals = useSelector((store: RootState) =>
    adapterSelectors.selectAll(store),
  );
  const count = useMemo(() => animals?.length, [animals]);

  const unselectHandler = useCallback(() => {
    animals.forEach((animal) => dispatch(toggleSelected(animal)));
  }, [animals]);

  useEffect(() => {
    const csvData = new Blob([convertToCSV(animals)], { type: "text/csv" });
    setCsvURL(URL.createObjectURL(csvData));
  }, [animals]);

  if (!count) return null;
  return (
    <div className={`${s.wrap} ${theme === 'light' ? s.light : ''}`}>
      <div className={s.label}>{count} items are selected</div>
      <button className={s.button} onClick={unselectHandler}>
        Unselect all
      </button>
      <a href={csvURL} download={`${count}_animals.csv`}>
        <button className={s.button}>Download</button>
      </a>
    </div>
  );
};

export default Flyout;
