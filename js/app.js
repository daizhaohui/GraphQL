import React from "react";
import ReactDOM from "react-dom";
import Quote from "./quote";
import "whatwg-fetch";
class QuotesLibrary extends React.Component {
  state = {
    allQuotes: []
  };

  static defaultProps = { greeting: "Hello" };

  componentDidMount() {
    fetch(`/graphql?query={
      quotesLibrary{
        allQuotes{
          id,
          text,
          author
        }
      }
    }`)
      .then(response => response.json())
      .then(json => {
        this.setState({ allQuotes: json.data.quotesLibrary.allQuotes });
      })
      .catch(ex => console.error(ex));
  }

  render() {
    return (
      <div className="quotes-list">
        {this.state.allQuotes.map(quote => (
          <Quote key={quote.id} quote={quote} />
        ))}
      </div>
    );
  }
}

ReactDOM.render(<QuotesLibrary />, document.getElementById("appContainer"));
