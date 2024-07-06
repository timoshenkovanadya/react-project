export type SearchBlockPropsType = {
  searchDataHandler: (newString: string) => void;
};
export type SearchBlockStateType = {
  searchValue: string;
};

export type FormFieldsType = EventTarget & {
  elements: { searchValue: { value: string } };
};
