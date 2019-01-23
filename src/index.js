import React, { Component } from "react";
import ReactDOM from "react-dom";
import PageSelection, { PAGE } from "./components/PageSelection/PageSelection";

import "./styles.css";

class App extends Component {
   constructor() {
      super();

      this.state = {
        page: PAGE.TASKS // PAGE.OPTION // PAGE.HOME
      };
   }

   openPage = nextPage => {
      this.setState({
         page: nextPage
      });
   };

   render() {
      return (
         <div className="App">
            <PageSelection page={this.state.page} openPage={this.openPage} />
         </div>
      );
   }
}

ReactDOM.render(<App />, document.getElementById("root"));
