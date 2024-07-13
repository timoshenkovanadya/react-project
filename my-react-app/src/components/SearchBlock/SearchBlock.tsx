import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useRef,
} from "react";
import { FormFieldsType, SearchBlockPropsType } from "./searchBlock.types";
import { useValueWithLocalStorage } from "../../hooks/useValueWithLocalStorage";
import { useNavigate, useParams } from "react-router-dom";

export const SearchBlock: React.FC<SearchBlockPropsType> = ({
  searchDataHandler,
  isFetching,
}) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { page } = useParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useValueWithLocalStorage();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    searchDataHandler(searchValue, page);
  }, [page]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const newValue = (e.target as FormFieldsType).elements.searchValue.value;
    searchDataHandler(newValue, "1");
    navigate(`/page/1`);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const throwErrorHandler = () => {
    setIsError(true);
  };

  if (isError) throw new Error("THIS IS TEST ERROR");

  return (
    <div className="search-block-wrap">
      <form className="search-block-form" onSubmit={submitHandler}>
        <label className="search-block-label">
          Everything you want to know about animals from star tracks
          <input
            className="search-block-input"
            type="text"
            name="searchValue"
            id="searchValue"
            value={searchValue}
            onChange={changeHandler}
            disabled={isFetching}
            ref={ref}
          />
        </label>
        <input
          disabled={isFetching}
          className="search-block-button"
          type="submit"
          value="Search"
        />
        <button
          className="throw-error-button"
          type="button"
          onClick={throwErrorHandler}
        >
          Throw error
        </button>
      </form>
    </div>
  );
};

export default SearchBlock;
