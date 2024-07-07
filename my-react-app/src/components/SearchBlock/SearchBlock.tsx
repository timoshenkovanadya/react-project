import React, { ChangeEventHandler, FormEventHandler } from "react";
import {
  FormFieldsType,
  SearchBlockPropsType,
  SearchBlockStateType,
} from "./searchBlock.types";

export class SearchBlock extends React.Component<
  SearchBlockPropsType,
  SearchBlockStateType
> {
  constructor(props: SearchBlockPropsType) {
    super(props);
    const initialValue = window.localStorage.getItem("searchValue") || "";
    this.state = {
      searchValue: initialValue,
      isError: false,
    };
    this.props.searchDataHandler(initialValue);
  }

  submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    const newValue = (e.target as FormFieldsType).elements.searchValue.value;
    this.props.searchDataHandler(newValue);
    window.localStorage.setItem("searchValue", newValue);
  };

  changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    this.setState((prev) => ({ ...prev, searchValue: newValue }));
  };

  throwErrorHandler = () => {
    this.setState((prev) => ({ ...prev, isError: true }));
  };

  render(): React.ReactNode {
    if (this.state.isError) throw new Error("THIS IS TEST ERROR");
    return (
      <div className="search-block-wrap">
        <form className="search-block-form" onSubmit={this.submitHandler}>
          <label className="search-block-label">
            Everything you want to know about animals from star tracks
            <input
              className="search-block-input"
              type="text"
              name="searchValue"
              id="searchValue"
              value={this.state.searchValue}
              onChange={this.changeHandler}
              disabled={this.props.isFetching}
            />
          </label>
          <input
            disabled={this.props.isFetching}
            className="search-block-button"
            type="submit"
            value="Search"
          />

          <button
            className="throw-error-button"
            type="button"
            onClick={this.throwErrorHandler}
          >
            Throw error
          </button>
        </form>
      </div>
    );
  }
}
