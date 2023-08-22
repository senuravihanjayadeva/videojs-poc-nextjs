import videojs from "video.js";

videojs.registerPlugin("customSpeedControl", function (options) {
  let player = this;
  
  // Dropdown menu to select speed options
  const speedSelectMenu = document.createElement("select");
  // styles for the select
  speedSelectMenu.id = "custom-speed-select-box";
  speedSelectMenu.style.backgroundColor = "transparent";
  speedSelectMenu.style.cursor = "pointer";

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2]; // Speed options

  speeds.forEach(function (speed) {
    const opt = document.createElement("option");
    // styles for the option
    opt.style.backgroundColor = "rgb(109, 110, 111)";
    opt.style.padding = "3px";
    opt.value = speed;
    opt.text = speed + "x";
    speedSelectMenu.appendChild(opt);
  });

  speedSelectMenu.onchange = function () {
    const newSpeed = this.value;
    player.playbackRate(newSpeed);
  };

  player.controlBar.el().appendChild(speedSelectMenu);
});
