import videojs from "video.js";
import "./custom-annotation.css";

videojs.registerPlugin("customTimestamp", function (options) {
  const player = this;

  player.ready(() => {
    // Add pause markers to the seek bar
    const progressControl = player.controlBar.progressControl;
    const seekBar = progressControl.seekBar.el();

    // Listen for the 'loadedmetadata' event to ensure the duration is available
    player.on("loadedmetadata", function () {
      const duration = player.duration(); // Total video duration in seconds
      options.timestamps.forEach((pausePoints, index) => {
        const marker = document.createElement("div");
        marker.classList.add("cue-points-marker");
        marker.id = `cue-points-marker-${index}`;
        marker.style.left = (pausePoints.starttime / duration) * 100 + "%";
        marker.style.position = "absolute";
        marker.style.width = "5px";
        marker.style.height = "100%";
        marker.style.backgroundColor = "#ff5722";
        marker.style.zIndex = "1";
        seekBar.appendChild(marker);
      });
    });

    let activePauseIndex = -1; // Index of the currently active pause time range
    let isTriggered = false;

    player.on("timeupdate", () => {
      const currentTime = Math.floor(player.currentTime());

      // Check if the current time matches any of the pause start times
      const newPauseIndex = options.timestamps.findIndex(
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
});
