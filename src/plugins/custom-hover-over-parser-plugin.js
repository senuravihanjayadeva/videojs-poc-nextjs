import videojs from "video.js";

videojs.registerPlugin("customHoverOverParser", function (hoverParsers) {
  const player = this;

  hoverParsers.forEach((element) => {
    // Create a modal container
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-hover-container";
    modalContainer.style.position = "absolute";
    modalContainer.style.top = `${element.py}%`; // Adjust the y-coordinate
    modalContainer.style.left = `${element.px}%`; // Adjust the x-coordinate
    modalContainer.style.width = `${element.pw}%`;
    modalContainer.style.height = `${element.ph}%`;
    modalContainer.style.backgroundColor = "transparent";
    modalContainer.style.display = "block"; // Hide modal initially

    const modalTextContainer = document.createElement("p");
    modalTextContainer.className = "modal-hover-text-container";
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

    // Get the start and end times for showing the modal
    const startTime = element.starttime; // Start time in seconds
    const endTime = element.endtime; // End time in seconds

    // Append modal container to player element
    player.el().appendChild(modalContainer);
    // Append modal container to player element
    player.el().appendChild(modalTextContainer);

    // Show modal at the start time
    player.on("timeupdate", () => {
      const currentTime = player.currentTime();
      if (currentTime >= startTime && currentTime <= endTime) {
        modalContainer.style.display = "block";

        modalContainer.addEventListener("mouseenter", () => {
          modalTextContainer.style.display = "block";
        });

        modalContainer.addEventListener("mouseout", () => {
          modalTextContainer.style.display = "none";
        });
      } else {
        modalContainer.style.display = "none";
      }
    });
  });
});
