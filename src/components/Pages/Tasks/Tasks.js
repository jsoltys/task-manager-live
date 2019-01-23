import React, { Component } from "react";
import Button from "../../Elements/Button/Button";
import TaskViewer from "../../Panels/TaskViewer/TaskViewer";
import TaskEditor from "../../Panels/TaskEditor/TaskEditor";
import TaskOptions from "../../Panels/TaskOptions/TaskOptions";

import { PAGE } from "../../PageSelection/PageSelection";

import {
   appendNewTimestamp,
   calculateMinuteDifference,
   isTaskRunning
} from "../../Globals/task.functions.js";
import { submitTaskToGooleSheet } from "../../Globals/zapier.functions.js";
import tutorialTasks from "../../../data/tutorial.json";

require("./Tasks.css");

class Tasks extends Component {
   switchToOptionsPage = () => {
      clearInterval(this.state.refresher);

      this.props.openPage(PAGE.OPTION);
   };

   submitToGSheets = offset => {
      let submission = this.state.tasks.filter((task, idx) => {
         return idx === offset;
      });

      submitTaskToGooleSheet(submission[0], this.state.username);

      this.removeTask(offset);
   };

   statusRefresher = () => {
      //console.log("Tasks.statusRefresher");

      this.setState({
         tasks: this.state.tasks.map((task, idx) => {
            // Update values for a temp time in task here only if active.
            if (isTaskRunning(task)) {
               let lastIdx = task.timestamp.length - 1;
               let lastTime = task.timestamp[lastIdx];

               task.liveMinutes = calculateMinuteDifference(
                  lastTime,
                  new Date()
               );
            }

            return task;
         })
      });
   };

   componentDidUpdate() {
      //console.log("componentDidUpdate:", this.state)
      localStorage.setItem("my-tasks", JSON.stringify(this.state.tasks));
   }

   componentDidMount() {
      let data = localStorage.getItem("my-tasks");

      clearInterval(this.state.refresher);

      if (data === null || data === undefined) {
         this.loadTasks(tutorialTasks);
      } else {
         this.loadTasks(JSON.parse(data));
      }

      // setup interval in state here
      this.setState({
         refresher: setInterval(this.statusRefresher, 1000)
      });
   }

   componentWillUnmount() {
      //console.log("componentWillUnmount:", this.state)
      clearInterval(this.state.refresher);
   }

   loadTasks = data => {
      let tutorial = data.map(task => {
         let dates = task.timestamp.map(timestamp => {
            return new Date(timestamp);
         });

         return {
            ...task,
            timestamp: dates
         };
      });

      this.setState({
         tasks: tutorial
      });
   };

   toggleTimer = () => {
      let { refresher } = this.state;

      if (refresher === null) {
         this.setState({
            refresher: setInterval(this.statusRefresher, 1000)
         });
      } else {
         clearInterval(this.state.refresher);

         this.setState({
            refresher: null
         });
      }
   };

   constructor(props) {
      super(props);

      this.state = {
         required: ["project", "name", "summary", "maxMinutes", "minMinutes"],
         tasks: [],
         template: null,
         username: "Jason"
      };
   }

   playPauseToggle = offset => {
      let updates = this.state.tasks;

      updates[offset] = appendNewTimestamp(updates[offset], new Date());
      updates[offset].liveMinutes = null;

      this.setState({
         tasks: updates
      });
   };

   updateTaskValue = (key, value) => {
      let { template } = this.state;

      template[key] = value;

      this.setState({
         template: template
      });
   };

   createNewTask = () => {
      this.setState({
         template: {
            isFinished: false,
            inDate: null,
            outDate: null,
            timestamp: [],
            project: "",
            name: "",
            summary: "",
            billable: 0,
            nonBillable: 0,
            curMinutes: 0,
            maxMinutes: "",
            minMinutes: "",
            userValue: 0
         }
      });
   };

   removeTask = offset => {
      let update = this.state.tasks.filter((task, idx) => {
         return idx !== offset;
      });

      this.setState({
         tasks: update
      });
   };

   appendNewTask = () => {
      let { required, template } = this.state;

      let passed = true;
      let status = required.filter(key => {
         return template[key] === "";
      });

      passed = passed && template["minMinutes"] < template["maxMinutes"];

      if (status.length === 0 && passed) {
         this.setState({
            tasks: [...this.state.tasks, this.state.template],
            template: null
         });
      } else {
         window.alert("Please fill in all required fields!");
      }
   };

   cancelNewTask = () => {
      this.setState({
         template: null
      });
   };

   render() {
      let { tasks, template } = this.state;

      return (
         <div className="Tasks">
            {tasks.map((task, idx) => {
               let taskStstus = isTaskRunning(task);
               let curMinutes =
                  task.liveMinutes !== undefined && task.liveMinutes !== null
                     ? task.billable + task.liveMinutes
                     : task.billable;

               return (
                  <div className="task-group" key={`task_${idx}`}>
                     <TaskViewer
                        offset={idx}
                        minMinutes={task.minMinutes}
                        maxMinutes={task.maxMinutes}
                        name={task.name}
                        project={task.project}
                        summary={task.summary}
                        curMinutes={curMinutes}
                        userLevel={task.userValue}
                        taskStatus={taskStstus}
                        playPauseToggle={this.playPauseToggle}
                     />
                     <TaskOptions
                        offset={idx}
                        removeTask={this.removeTask}
                        submitToGSheets={this.submitToGSheets}
                     />
                  </div>
               );
            })}
            {template !== null ? (
               <div className="controls">
                  <TaskEditor
                     maxMinutes={this.state.template.maxMinutes}
                     minMinutes={this.state.template.minMinutes}
                     name={this.state.template.name}
                     project={this.state.template.project}
                     summary={this.state.template.summary}
                     updateTaskValue={this.updateTaskValue}
                  />
                  <Button
                     label="Save Task"
                     action={this.appendNewTask}
                     classColor="themeGray shadow"
                  />
                  <Button
                     label="Cancel"
                     action={this.cancelNewTask}
                     classColor="danger shadow"
                  />
               </div>
            ) : (
                  <div className="controls">
                     <Button
                        label="New Task"
                        action={this.createNewTask}
                        classColor="themeGray shadow"
                     />
                     <Button
                        label="Options"
                        action={this.switchToOptionsPage}
                        classColor="success shadow"
                     />
                  </div>
               )}
            <Button
               label="Toggle Timer"
               action={this.toggleTimer}
               classColor=""
            />
         </div>
      );
   }
}

export default Tasks;
