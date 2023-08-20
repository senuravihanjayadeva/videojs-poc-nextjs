import videojs from "video.js";
import "./custom-annotation.css";

videojs.registerPlugin("customExternalConceptCheck", function () {
  const player = this;

  // Functiont to create a box for answers
  function createAnswer() {
    // Create a modal container
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-external-concept-check-container";
    modalContainer.id = "modal-external-concept-check-container";
    modalContainer.style.position = "absolute";
    modalContainer.style.top = `10%`; // Adjust the y-coordinate
    modalContainer.style.left = `50%`; // Adjust the x-coordinate
    modalContainer.style.border = "2px solid #ffffff";
    modalContainer.style.color = "white";
    modalContainer.style.backgroundColor = "black";
    modalContainer.style.display = "block"; // Hide modal initially

    let isClosed = false;
    // Create a close button within the modal
    const closeButton = document.createElement("button");
    closeButton.className = "modal-external-concept-check-close-button";
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
    pElement.textContent = "Please select your favorite Web language:";
    pElement.style.fontSize = "large";

    // Create radio buttons and labels
    const languages = [
      { id: "html", value: "HTML", label: "HTML" },
      { id: "css", value: "CSS", label: "CSS" },
      { id: "javascript", value: "JavaScript", label: "JavaScript" },
    ];

    const radioContainer = document.createElement("div");
    radioContainer.style.fontSize = "large";

    languages.forEach((language) => {
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.id = language.id;
      radioInput.name = "fav_language";
      radioInput.value = language.value;

      const label = document.createElement("label");
      label.textContent = language.label;
      label.setAttribute("for", language.id);

      radioContainer.appendChild(radioInput);
      radioContainer.appendChild(label);
      radioContainer.appendChild(document.createElement("br"));
    });

    // Append elements to the document body
    modalContainer.appendChild(pElement);
    modalContainer.appendChild(radioContainer);

    // Append modal container to player element
    player.el().appendChild(modalContainer);
  }

  // Define an array of pause time ranges (in seconds)
  const pauseTimeRanges = [
    { start: 3, end: 4 },
    { start: 10, end: 11 },
    // Add more time ranges as needed
  ];

  let activePauseIndex = -1; // Index of the currently active pause time range
  let isTriggered = false;

  player.on("timeupdate", () => {
    const currentTime = Math.floor(player.currentTime());

    // Check if the current time is within any of the pause time ranges
    const newPauseIndex = pauseTimeRanges.findIndex(
      (range) => currentTime >= range.start && currentTime < range.end
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
        createAnswer();
        isTriggered = true;
        activePauseIndex = newPauseIndex;
      } else {
        isTriggered = false;
        activePauseIndex = -1;
      }
    }
  });
});
