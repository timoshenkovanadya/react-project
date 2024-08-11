import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adapterSelectors, RootState, toggleSelected } from "../../store/store";
import { CardCheckboxPropsType } from "./cardCheckbox.types";

export const CardCheckbox = ({ animal }: CardCheckboxPropsType) => {
  const isChecked = !!useSelector((store: RootState) =>
    adapterSelectors.selectById(store, animal.uid),
  );
  const dispatch = useDispatch();

  const clickHandler = (e: ChangeEvent) => {
    e.stopPropagation();
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
