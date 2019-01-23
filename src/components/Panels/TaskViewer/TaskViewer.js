import React, { Component } from "react";
import ProgressBar from "../../Elements/ProgressBar/ProgressBar";

require("./TaskViewer.css");

class TaskViewer extends Component {
   constructor(props) {
      super(props);

      this.state = {
         longPress: null
      };
   }

   startPressNHold = e => {
      this.setState({
         isPressed: true,
         longPress: setTimeout(() => {
            this.setState({
               validLongPress: true
            });
         }, 2000)
      });
   };

   endPressNHold = e => {
      let { validLongPress, isPressed } = this.state;
      let { offset } = this.props;

      e.preventDefault();

      clearTimeout(this.state.longPress);
      this.setState({
         isPressed: null,
         validLongPress: null
      });

      if (validLongPress) {
         // this.setState({});
         console.log("endPressNHold Show Options");
      } else {
         this.props.playPauseToggle(offset);
      }
   };

   render() {
      let {
         name,
         project,
         summary,
         curMinutes,
         maxMinutes,
         minMinutes,
         userLevel,
         taskStatus
      } = this.props;

      let minutePerc = (1 / maxMinutes) * 100;

      // Progress bar status
      let progressValue = (curMinutes / maxMinutes) * 100;

      // Progress bar warning
      let userValue = userLevel === null ? 0 : userLevel;
      let warningValue =
         (Math.round(
            maxMinutes - (maxMinutes - minMinutes) * (userValue / 100)
         ) /
            3) *
         2 *
         minutePerc;

      return (
         <div
            className="TaskViewer"
            onMouseDown={this.startPressNHold}
            onMouseUp={this.endPressNHold}
            onTouchStart={this.startPressNHold}
            onTouchEnd={this.endPressNHold}
         >
            <div className="header">
               {name} ({project})
            </div>
            <div>{summary}</div>
            <ProgressBar
               progress={progressValue}
               warning={warningValue}
               isRunning={taskStatus}
            />
         </div>
      );
   }
}

export default TaskViewer;
