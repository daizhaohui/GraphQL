import React from "react";
import ReactDOM from "react-dom";
import Quote from "./quote";
import "whatwg-fetch";

class App extends React.Component {
  state = {
    allQuotes: []
  };

  componentDidMount() {
    fetch(`/graphql?query={
      allQuotes{
        id,
        text,
        author
      }
    }`)
      .then(response => response.json())
      .then(json => {
        this.setState({ allQuotes: json.data.allQuotes });
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

App.defaultProps = { greeting: "Hello" };

ReactDOM.render(<App />, document.getElementById("appContainer"));
