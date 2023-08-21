import videojs from "video.js";

videojs.registerPlugin("customHoverOverParser", function (options) {
  const player = this;

  player.ready(() => {
    options.hoverTimestamps.forEach((element) => {
      // Create a common parent container for the modal and text container
      const parentContainer = document.createElement("div");
      parentContainer.className = "modal-parent-container";
      parentContainer.style.position = "absolute";
      parentContainer.style.top = `${element.py}%`; // Adjust the y-coordinate
      parentContainer.style.left = `${element.px}%`; // Adjust the x-coordinate
      parentContainer.style.width = `${element.pw}%`;
      parentContainer.style.height = `${element.ph}%`;
      parentContainer.style.backgroundColor = "transparent";
      parentContainer.style.display = "none"; // Hide parent container initially

      // Create modal text container
      const modalTextContainer = document.createElement("div");
      modalTextContainer.className = "modal-hover-container";
      modalTextContainer.style.position = "absolute";
      modalTextContainer.style.top = `${element.cy}%`; // Adjust the y-coordinate
      modalTextContainer.style.left = `${element.cx}%`; // Adjust the x-coordinate
      modalTextContainer.style.width = `${element.cw}%`;
      modalTextContainer.style.height = `${element.ch}`;
      modalTextContainer.style.backgroundColor = "black";
      modalTextContainer.style.color = "white";
      modalTextContainer.style.padding = "5px";
      modalTextContainer.style.fontSize = "large";
      modalTextContainer.style.display = "none"; // Hide modal initially
      modalTextContainer.innerHTML = element.text;

      // Append modal container to parent container
      parentContainer.appendChild(modalTextContainer);

      // Append parent container to player element
      player.el().appendChild(parentContainer);

      // Get the start and end times for showing the modal
      const startTime = element.starttime; // Start time in seconds
      const endTime = element.endtime; // End time in seconds

      // Show modal at the start time
      player.on("timeupdate", () => {
        const currentTime = player.currentTime();
        if (currentTime >= startTime && currentTime <= endTime) {
          parentContainer.style.display = "block";
        } else {
          parentContainer.style.display = "none";
        }
      });

      // Show modal text container on hover
      parentContainer.addEventListener("mouseenter", () => {
        modalTextContainer.style.display = "block";
      });

      // Hide modal text container on hover out
      parentContainer.addEventListener("mouseleave", () => {
        modalTextContainer.style.display = "none";
      });
    });
  });
});
