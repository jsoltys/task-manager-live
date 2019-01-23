import React, { Component } from "react";
import Button from "../../Elements/Button/Button";

require("./TaskOptions.css");

class TaskOptions extends Component {
   removeTask = () => {
      let { offset } = this.props;

      this.props.removeTask(offset);
   };

   submitToGSheets = () => {
      let { offset } = this.props;

      this.props.submitToGSheets(offset);
   };

   render() {
      return (
         <div className="TaskOptions">
            <Button
               label="Remove"
               classColor="bottomtab shadow"
               action={this.removeTask}
            />
            <Button
               label="Submit to GSheets"
               classColor="bottomtab shadow"
               action={this.submitToGSheets}
            />
         </div>
      );
   }
}

export default TaskOptions;
