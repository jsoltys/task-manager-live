import React, { Component } from "react";

import projects from "../../../data/projects.json";

require("./TaskEditor.css");

class TaskEditor extends Component {
  updateTaskValue = event => {
    this.props.updateTaskValue(event.target.name, event.target.value);
  };

  updateTaskInteger = event => {
    this.props.updateTaskValue(
      event.target.name,
      parseInt(event.target.value, 0)
    );
  };

  render() {
    let {
      minMinutes,
      maxMinutes,
      name,
      project,
      summary,
      userValue
    } = this.props;

    return (
      <div className="TaskEditor shadow">
        <select
          name="project"
          defaultValue={project}
          onChange={this.updateTaskValue}
        >
          {projects.map(project => {
            return (
              <option key={project.value} value={project.value}>
                {project.label}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Name of Task"
          value={name}
          onChange={this.updateTaskValue}
        />
        <textarea
          placeholder="Summary of Task"
          value={summary}
          name="summary"
          onChange={this.updateTaskValue}
        />
        <input
          type="number"
          name="minMinutes"
          placeholder="Minimal alloted time for Task"
          value={minMinutes}
          onChange={this.updateTaskInteger}
        />
        <input
          type="number"
          name="maxMinutes"
          placeholder="Maximum alloted time for Task"
          value={maxMinutes}
          onChange={this.updateTaskInteger}
        />
        <input
          type="number"
          name="userValue"
          placeholder="User experience"
          value={userValue}
          onChange={this.updateTaskInteger}
        />
      </div>
    );
  }
}

export default TaskEditor;
