import videojs from "video.js";

videojs.registerPlugin("customCaption", function (options) {
  const player = this;

  player.ready(() => {
    // Load the video description track
    options.captions.forEach((track) => {
      player.addRemoteTextTrack(track, true);
    });
  });
});
