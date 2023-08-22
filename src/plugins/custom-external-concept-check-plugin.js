import videojs from "video.js";

videojs.registerPlugin("customExternalConceptCheck", function (options) {
  const player = this;
  let newStartTime = null;
  let newEndTime = null;
  let newSkipTime = null;

  // Functiont to create a box for answers
  function createAnswer(item) {
    // Create a modal container
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-external-concept-check-container";
    modalContainer.id = "modal-external-concept-check-container";
    modalContainer.style.position = "absolute";
    modalContainer.style.top = `5%`; // Adjust the y-coordinate
    modalContainer.style.right = `5%`; // Adjust the x-coordinate
    modalContainer.style.border = "2px solid #ffffff";
    modalContainer.style.color = "white";
    modalContainer.style.backgroundColor = "#474646";
    modalContainer.style.padding = "1% 2%";
    modalContainer.style.display = "block"; // Hide modal initially

    let isClosed = false;
    // Create a close button within the modal
    const closeButton = document.createElement("button");
    closeButton.className = "modal-external-concept-check-close-button";
    closeButton.style.position = "absolute";
    closeButton.style.top = `1%`; // Adjust the y-coordinate
    closeButton.style.right = `1%`; // Adjust the x-coordinate
    // Add Video.js close icon
    closeButton.innerHTML = '<span class="vjs-icon-cancel"></span>';
    closeButton.addEventListener("click", () => {
      modalContainer.style.display = "none";
      isClosed = true;
    });

    // Append the close button to the modal container
    modalContainer.appendChild(closeButton);

    // Create answers within the modal
    // Create the <p> element
    const pElement = document.createElement("p");
    pElement.textContent = item.question;
    pElement.style.fontSize = "large";
    pElement.style.marginBottom = "3%";
    pElement.style.marginTop = "8%";

    // Create radio buttons and labels
    const radioContainer = document.createElement("div");
    radioContainer.style.fontSize = "medium";

    item.answers.forEach((answer, index) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.id = answer.id;
      radioInput.name = "answer";
      radioInput.value = answer.value;
      radioInput.style.margin = "10px 0px";

      const label = document.createElement("label");
      label.textContent = answer.label;
      label.style.margin = "10px 0px";
      label.setAttribute("for", answer.id);

      radioContainer.appendChild(radioInput);
      radioContainer.appendChild(label);
      radioContainer.appendChild(document.createElement("br"));
      radioInput.addEventListener("change", () => {
        if (radioInput.checked) {
          newSkipTime = answer.skiptime;
          newEndTime = answer.endtime;
          newStartTime = answer.starttime;
          btnElement.style.display = "block";
        }
      });
    });

    // Append elements to the document body
    modalContainer.appendChild(pElement);
    modalContainer.appendChild(radioContainer);

    const btnElement = document.createElement("button");
    btnElement.textContent = "submit";
    btnElement.style.border = "1px solid #fff";
    btnElement.style.padding = "5px";
    btnElement.style.margin = "5px 0px";
    btnElement.style.fontSize = "medium";
    btnElement.style.display = "none";
    btnElement.onclick = () => {
      player.currentTime(newStartTime);
      player.play();
    };

    modalContainer.appendChild(btnElement);

    // Append modal container to player element
    player.el().appendChild(modalContainer);
  }

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
        marker.style.left = (pausePoints.start / duration) * 100 + "%";
        marker.style.position = "absolute";
        marker.style.width = "5px";
        marker.style.height = "100%";
        marker.style.backgroundColor = "#ff5722";
        marker.style.zIndex = "1";
        seekBar.appendChild(marker);
      });
    });

    //Skip the video after answer explaining
    player.on("timeupdate", () => {
      const currentTime = Math.floor(player.currentTime());
      if (currentTime == newEndTime) {
        player.currentTime(newSkipTime);
        player.play();
      }
    });

    let activePauseIndex = -1; // Index of the currently active pause time range

    player.on("timeupdate", () => {
      const currentTime = Math.floor(player.currentTime());

      // Check if the current time is within any of the pause time ranges
      const newPauseIndex = options.questions.findIndex(
        (range) => currentTime == range.start
      );

      if (newPauseIndex !== activePauseIndex) {
        // Remove previous actions
        let deleteAnswer = document.getElementById(
          "modal-external-concept-check-container"
        );
        if (deleteAnswer) {
          deleteAnswer.remove();
        }

        // Pause the video and create new actions
        if (newPauseIndex !== -1) {
          player.pause();
          createAnswer(options.questions[newPauseIndex]);
          activePauseIndex = newPauseIndex;
        } else {
          activePauseIndex = -1;
        }
      }
    });
  });
});
