import videojs from "video.js";
import "./custom-annotation.css";

videojs.registerPlugin("customAnnotation", function (options) {
  const player = this;

  player.ready(() => {
    options.annotation.forEach((element) => {
      // Create a modal container
      const modalContainer = document.createElement("div");
      modalContainer.className = "modal-container";
      modalContainer.style.position = "absolute";
      modalContainer.style.top = `${element.y}%`; // Adjust the y-coordinate
      modalContainer.style.left = `${element.x}%`; // Adjust the x-coordinate
      modalContainer.style.width = `${element.width}%`;
      modalContainer.style.height = `${element.height}%`;
      modalContainer.style.border = "2px solid #ffffff";
      modalContainer.style.color = "white";
      modalContainer.style.display = "none"; // Hide modal initially

      // Create a link (anchor element)
      const linkElement = document.createElement("a");
      linkElement.href = "https://example.com"; // Replace with your link URL
      linkElement.target = "_blank"; // Open link in a new tab

      // Append the link to the modal container
      modalContainer.appendChild(linkElement);

      let isClosed = false;
      // Create a close button within the modal
      const closeButton = document.createElement("button");
      closeButton.className = "modal-close-button";
      // Add Video.js close icon
      closeButton.innerHTML = '<span class="vjs-icon-cancel"></span>';
      closeButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
        isClosed = true;
      });

      // Append the close button to the modal container
      modalContainer.appendChild(closeButton);

      // Get the start and end times for showing the modal
      const startTime = element.starttime; // Start time in seconds
      const endTime = element.endtime; // End time in seconds

      // Append modal container to player element
      player.el().appendChild(modalContainer);

      // Show modal at the start time
      player.on("timeupdate", () => {
        const currentTime = player.currentTime();

        if (currentTime >= startTime && currentTime <= endTime) {
          if (!isClosed) {
            modalContainer.style.display = "block";
          }
        } else {
          modalContainer.style.display = "none";
        }

        if (currentTime <= startTime) {
          isClosed = false;
        }
      });
    });
  });
});
