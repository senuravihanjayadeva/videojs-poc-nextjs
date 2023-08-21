import videojs from "video.js";

videojs.registerPlugin("customVideoQualityChanger", function (options) {
  const player = this;

  player.ready(() => {
    let myButton = player.controlBar.addChild(
      "button",
      {},
      player.controlBar.children().length
    );

    // Create our button's DOM Component
    let selectBoxContainer = myButton.el();
    selectBoxContainer.classList.add("custom-select-quality");
    selectBoxContainer.classList.add("vjs-button");

    const selectBox = document.createElement("select");
    // styles for the select
    selectBox.style.backgroundColor = "transparent";
    selectBox.style.cursor = "pointer";

    options.sources.forEach((option) => {
      const opt = document.createElement("option");
      // styles for the option
      opt.style.backgroundColor = "rgb(109, 110, 111)";
      opt.value = option.src;
      opt.text = option.quality;
      selectBox.appendChild(opt);
    });

    selectBox.onchange = function () {
      const source = this.value;
      player.src(source);
    };

    selectBoxContainer.appendChild(selectBox);
  });
});
