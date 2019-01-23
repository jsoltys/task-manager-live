import React, { Component } from "react";
import Sound from "react-sound";

require("./AudioPlayer.css");

class AudioPlayer extends Component {
   handleSongFinishedPlaying = () => {
      this.props.hasPlayed();
   };

   render() {
      let { filepath } = this.props;

      return (
         <Sound
            url={filepath}
            playStatus={Sound.status.PLAYING}
            onFinishedPlaying={this.handleSongFinishedPlaying}
         />
      );
   }
}

export default AudioPlayer;
