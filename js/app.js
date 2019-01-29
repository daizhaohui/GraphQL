import React from "react";
import ReactDOM from "react-dom";
import Quote from "./quote";
import "whatwg-fetch";
import Relay from "react-relay/classic";
class QuotesLibrary extends React.Component {
  state = {
    allQuotes: []
  };

  static defaultProps = { greeting: "Hello" };

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

QuotesLibrary = Relay.createContainer(QuotesLibrary, {
  fragments: {}
});

class AppRoute extends Relay.Route {
  static routeName = "App";
}

ReactDOM.render(
  <Relay.RootContainer Component={QuotesLibrary} route={new AppRoute()} />,
  document.getElementById("appContainer")
);
