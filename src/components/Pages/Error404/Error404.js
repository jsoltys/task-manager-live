import React, { Component } from "react";
import Button from "../../Elements/Button/Button";

import { PAGE } from "../../PageSelection/PageSelection";

require("./Error404.css");

class Error404 extends Component {
   returnHome = () => {
      console.log("Error404.returnHome");

      this.props.openPage(PAGE.HOME);
   };

   contactSupport = () => {
      console.log("Error404.contactSupport");
   };

   render() {
      return (
         <div className="Error404">
            <h1>Page Not Found</h1>
            <p>
               We can't find the page you're looking for.
               <br />
               You can either return to the previous page, visit our homepage,
               or contact our support team.
            </p>
            <div className="controls">
               <Button
                  label="Visit Homepage"
                  action={this.returnHome}
                  classColor="primary"
               />
               <Button label="Contact Us" action={this.contactSupport} />
            </div>
         </div>
      );
   }
}

export default Error404;
