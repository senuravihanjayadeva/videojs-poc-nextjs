// Import necessary functions from Video.js
import videojs from "video.js";

videojs.registerPlugin("framebyframe", function (options) {
  const player = this;
  // Define the FBFButton class as an extension of the Button class
  var Button = videojs.getComponent("Button");
  class FBFButton extends Button {
    constructor(player, options) {
      super(player, options);
      this.frameTime = 1 / options.fps;
      this.step_size = options.value;
      this.on("click", this.onClick);
    }

    onClick() {
      // Start by pausing the player
      player.pause();
      // Calculate movement distance
      const dist = this.frameTime * this.step_size;
      player.currentTime(player.currentTime() + dist);
    }
  }

  player.ready(() => {
    options.steps.forEach((opt) => {
      const b = player.controlBar.addChild(
        new FBFButton(player, {
          el: videojs.dom.createEl(
            "button",
            {
              className: "vjs-res-button vjs-control",
              innerHTML: `<div class="vjs-control-content"><span class="vjs-fbf">${opt.text}</span></div>`,
            },
            {
              role: "button",
            }
          ),
          value: opt.step,
          fps: options.fps,
        })
      );
      player.controlBar.el().appendChild(b.el());
    });
  });
});
