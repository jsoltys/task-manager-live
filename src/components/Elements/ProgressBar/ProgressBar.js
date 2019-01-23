import React, { Component } from "react";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

require("./ProgressBar.css");

class ProgressBar extends Component {
   constructor(props) {
      super(props);

      this.state = {
         playedWarning: false
      };
   }

   hasPlayed = () => {
      this.setState({
         playedWarning: true
      });
   };

   render() {
      let { progress, warning, isRunning } = this.props;
      let progressStyle = "status";
      let soundfile = "";

      if (isRunning) {
         progressStyle += " running";
      }
      if (progress >= warning) {
         progressStyle += " warn";

         if (this.state.playedWarning === false) {
            soundfile = "sounds/warning.mp3";
         }
      }
      if (progress > 100) {
         progressStyle += " error";
      }

      return (
         <div className="ProgressBar">
            <div className={progressStyle} style={{ width: `${progress}%` }} />
            <div className="confirm" style={{ left: `${warning}%` }} />
            {soundfile ? (
               <AudioPlayer filepath={soundfile} hasPlayed={this.hasPlayed} />
            ) : null}
         </div>
      );
   }
}

export default ProgressBar;
