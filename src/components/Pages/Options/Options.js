import React, { Component } from "react";
import Button from "../../Elements/Button/Button";

import { PAGE } from "../../PageSelection/PageSelection";
import tutorialTasks from "../../../data/tutorial.json";

require("./Options.css");

class OptionsPage extends Component {
   loadServerTasks = () => {
      window.fetch("https://teamci.org/tmcp.nsf/tutorial.json")
         .then(response => response.json())
         .then(data => {
            localStorage.setItem("my-tasks", JSON.stringify(data));

            this.setState({
               refresh: this.setState.refresh ? !this.setState.refresh : true
            });
         });
   };

   clearTasks = () => {
      localStorage.setItem("my-tasks", JSON.stringify([]));

      this.setState({
         refresh: this.setState.refresh ? !this.setState.refresh : true
      });
   };

   loadTutorial = () => {
      localStorage.setItem("my-tasks", JSON.stringify(tutorialTasks));

      this.setState({
         refresh: this.setState.refresh ? !this.setState.refresh : true
      });
   };

   viewTasks = () => {
      this.props.openPage(PAGE.TASKS);
   };

   placeholder = () => {
      console.log("OptionsPage.placeholder");
   };

   render() {
      let tasksJson = localStorage.getItem("my-tasks");

      return (
         <div className="OptionsPage">
            <Button
               label="Clear All Tasks"
               action={this.clearTasks}
               classColor="themeGray shadow"
            />
            <Button
               label="Load Daily Tasks"
               action={this.loadServerTasks}
               classColor="themeGray shadow"
            />
            <Button
               label="Load Tutorial Tasks"
               action={this.loadTutorial}
               classColor="themeGray shadow"
            />
          {tasksJson !== "[]" && tasksJson !== null ? (
               <Button
                  label="Download Tasks"
                  downloadData={tasksJson}
                  downloadName="tasks.json"
                  classColor="themeGray shadow"
               />
            ) : null}
            <Button
               label="Upload Tasks"
               action={this.placeholder}
               classColor="themeGray shadow"
               uploadFile={true}
            />
            <Button
               label="View Tasks"
               action={this.viewTasks}
               classColor="success shadow"
            />
         </div>
      );
   }
}

export default OptionsPage;
