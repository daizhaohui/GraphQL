import React from "react";
export default class Quote extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <blockquote>
        <p>{this.props.quote.text}</p>
        <footer>{this.props.quote.author}</footer>
      </blockquote>
    );
  }
}
