import videojs from "video.js";

videojs.registerPlugin("customInternalConceptCheck", function (options) {
  const player = this;

  player.ready(() => {
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
      const parentContainer = document.createElement("div");
      parentContainer.className = "internal-answer-container";
      parentContainer.id = `internal-answer-container-${index}`;
      parentContainer.style.position = "absolute";
      parentContainer.style.top = `${answer.py}%`; // Adjust the y-coordinate
      parentContainer.style.left = `${answer.px}%`; // Adjust the x-coordinate
      parentContainer.style.width = `50px`;
      parentContainer.style.height = `50px`;
      parentContainer.style.display = "block"; // Hide parent container initially

      parentContainer.onclick = () => {
        player.currentTime(answer.starttime);
        player.play();
      };

      // Append parent container to player element
      player.el().appendChild(parentContainer);
    });
  }
});
