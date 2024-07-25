import { ChangeEvent, useState } from "react";
import { CardCheckboxPropsType } from "./cardCheckbox.types";
import { adapterSelectors, store, toggleSelected } from "../../store/store";
import { useDispatch } from "react-redux";

export const CardCheckbox = ({ animal }: CardCheckboxPropsType) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(
    !!adapterSelectors.selectById(store.getState(), animal.uid),
  );
  const clickHandler = (e: ChangeEvent) => {
    e.stopPropagation();
    setIsChecked((prev) => !prev);
    dispatch(toggleSelected(animal));
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={clickHandler}
        onClick={(e) => e.stopPropagation()}
      ></input>
    </div>
  );
};
