import videojs from "video.js";
import "./custom-annotation.css";

videojs.registerPlugin("customTimestamp", function (timestamps) {
  const player = this;

  let activePauseIndex = -1; // Index of the currently active pause time range
  let isTriggered = false;

  player.on("timeupdate", () => {
    const currentTime = Math.floor(player.currentTime());

    // Check if the current time matches any of the pause start times
    const newPauseIndex = timestamps.findIndex(
      (range) => currentTime == range.starttime
    );

    if (newPauseIndex !== activePauseIndex) {
      // Pause the video and create new actions
      if (newPauseIndex !== -1) {
        player.pause();
        isTriggered = true;
        activePauseIndex = newPauseIndex;
      } else {
        isTriggered = false;
        activePauseIndex = -1;
      }
    }
  });
});
