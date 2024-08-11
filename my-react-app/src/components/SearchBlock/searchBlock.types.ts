export type SearchBlockPropsType = {
  searchDataHandler: (newString: string, page: string | undefined) => void;
  isFetching: boolean;
};
export type SearchBlockStateType = {
  searchValue: string;
  isError: boolean;
};

export type FormFieldsType = EventTarget & {
  elements: { searchValue: { value: string } };
};
