export type SearchBlockPropsType = {
  searchDataHandler: (newString: string) => void;
};
export type SearchBlockStateType = {
  searchValue: string;
  isError: boolean;
};

export type FormFieldsType = EventTarget & {
  elements: { searchValue: { value: string } };
};
