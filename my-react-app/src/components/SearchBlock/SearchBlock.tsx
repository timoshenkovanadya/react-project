import React, { FormEventHandler } from "react";
import { FormFieldsType, SearchBlockPropsType } from "./searchBlock.types";

export class SearchBlock extends React.Component<SearchBlockPropsType> {
  constructor(props: SearchBlockPropsType) {
    super(props);
  }
  
  submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    const newValue = (e.target as FormFieldsType).elements.searchValue.value;
    this.props.searchDataHandler(newValue);
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
            />
          </label>
          <input className="search-block-button" type="submit" value="Search" />
        </form>
      </div>
    );
  }
}
