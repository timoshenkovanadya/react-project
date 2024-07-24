import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cardsService } from "../../api/cardsService";
import { useValueWithLocalStorage } from "../../hooks/useValueWithLocalStorage";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { FormFieldsType } from "./searchBlock.types";

export const SearchBlock = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const { page } = useParams();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useValueWithLocalStorage();
  const [isError, setIsError] = useState<boolean>(false);
  const [getCardsTrigger, { isLoading }] = cardsService.useGetCardsMutation();

  useEffect(() => {
    getCardsTrigger({ name: searchValue, page });
  }, [page]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const newValue = (e.target as FormFieldsType).elements.searchValue.value;
    getCardsTrigger({ name: newValue, page });
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
      <form
        className="search-block-form"
        data-testid="form"
        onSubmit={submitHandler}
      >
        <label className="search-block-label">
          Everything you want to know about animals from star tracks
          <input
            className="search-block-input"
            type="text"
            name="searchValue"
            id="searchValue"
            value={searchValue}
            onChange={changeHandler}
            disabled={isLoading}
            ref={ref}
          />
        </label>
        <input
          disabled={isLoading}
          className="search-block-button"
          type="submit"
          value="Search"
        />
        <button
          data-testid="error-button"
          className="throw-error-button"
          type="button"
          onClick={throwErrorHandler}
        >
          Throw error
        </button>
      </form>
      <ThemeToggle />
    </div>
  );
};

export default SearchBlock;
