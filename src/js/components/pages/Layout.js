import React from "react";

import Header from "../Header";

export default class Layout extends React.Component {

  render() {

    return (
      <div>
        <Header  />
        {this.props.children}
      </div>

    );
  }
}