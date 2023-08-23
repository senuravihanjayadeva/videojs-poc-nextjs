import videojs from "video.js";

videojs.registerPlugin("customInternalConceptCheck", function (options) {
  const player = this;

  player.ready(() => {
    // Add pause markers to the seek bar
    const progressControl = player.controlBar.progressControl;
    const seekBar = progressControl.seekBar.el();

    // Listen for the 'loadedmetadata' event to ensure the duration is available
    player.on("loadedmetadata", function () {
      const duration = player.duration(); // Total video duration in seconds
      options.questions.forEach((pausePoints, index) => {
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

    player.on("timeupdate", () => {
      const currentTime = Math.floor(player.currentTime());

      // Check if the current time is within any of the pause time ranges
      const newPauseIndex = options.questions.findIndex(
        (range) => currentTime >= range.starttime && currentTime < range.endtime
      );

      if (newPauseIndex !== activePauseIndex) {
        // Remove previous dom elements
        options.questions[activePauseIndex]?.answers.forEach(
          (answer, index) => {
            let deleteAnswer = document.getElementById(
              `internal-answer-container-${index}`
            );
            if (deleteAnswer) {
              deleteAnswer.remove();
            }
          }
        );

        // Pause the video and create new actions
        if (newPauseIndex !== -1) {
          player.pause();
          createAnswerModal(options.questions[newPauseIndex]);
          activePauseIndex = newPauseIndex;
        } else {
          activePauseIndex = -1;
        }
      }
    });
  });

  function createAnswerModal(question) {
    question.answers.forEach((answer, index) => {
      // Create a common parent container for the modal and text container
      // Create a common parent container for the modal and text container
      const parentContainer = document.createElement("div");
      parentContainer.className = "modal-parent-answer-container";
      parentContainer.style.position = "absolute";
      parentContainer.style.top = `${answer.cy}%`; // Adjust the y-coordinate
      parentContainer.style.left = `${answer.cx}%`; // Adjust the x-coordinate
      parentContainer.style.width = `${answer.cw}`;
      parentContainer.style.height = `${answer.ch}`;
      parentContainer.style.backgroundColor = "transparent";
      parentContainer.style.display = "block"; // Hide parent container initially

      const hoverContainer = document.createElement("div");
      hoverContainer.className = "internal-answer-container";
      hoverContainer.id = `internal-answer-container-${index}`;
      hoverContainer.style.position = "absolute";
      hoverContainer.style.top = `${answer.py}%`; // Adjust the y-coordinate
      hoverContainer.style.left = `${answer.px}%`; // Adjust the x-coordinate
      hoverContainer.style.width = `50px`;
      hoverContainer.style.height = `50px`;
      hoverContainer.style.display = "none"; // Hide parent container initially

      parentContainer.appendChild(hoverContainer);

      // Show modal at the start time
      player.on("timeupdate", () => {
        const currentTimePlayer = Math.floor(player.currentTime());
        if (currentTimePlayer == question.starttime) {
          parentContainer.style.display = "block";
        } else {
          parentContainer.style.display = "none";
        }
      });

      // Show modal text container on hover
      parentContainer.addEventListener("mouseenter", () => {
        hoverContainer.style.display = "block";
      });

      // Hide modal text container on hover out
      parentContainer.addEventListener("mouseleave", () => {
        hoverContainer.style.display = "none";
      });

      parentContainer.onclick = () => {
        player.currentTime(answer.starttime);
        player.play();
      };

      // Append parent container to player element
      player.el().appendChild(parentContainer);
    });
  }
});
