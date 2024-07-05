export type SearchBlockPropsType = {
  searchDataHandler: (newString: string) => void;
};

export type FormFieldsType = EventTarget & { elements: { searchValue: {value: string} } };
