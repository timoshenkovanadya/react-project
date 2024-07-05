import React from "react";

export class SearchBlock extends React.Component {

  render(): React.ReactNode {
    return <div className="search-block-wrap">
         <form className ="search-block-form">
        <label className ="search-block-label">
          Everything you want to know about animals from star tracks
          <input className ="search-block-input" type="text"/>
        </label>
        <input className ="search-block-button" type="submit" value="Search" />
      </form>
    </div>;
  }
}
