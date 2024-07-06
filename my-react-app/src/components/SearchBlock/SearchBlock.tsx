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
    this.setState({ searchValue: newValue });
  };

  render(): React.ReactNode {
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
            />
          </label>
          <input className="search-block-button" type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
