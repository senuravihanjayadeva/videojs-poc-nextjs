import videojs from "video.js";

videojs.registerPlugin("customAudioDescribe", function (options) {
  const player = this;

  player.ready(() => {
    // Adding button to the control bar
    var myButton = player.controlBar.addChild(
      "button",
      {},
      player.controlBar.children().length
    );

    // Create our button's DOM Component
    var myButtonDom = myButton.el();
    // Inside your plugin code
    myButtonDom.classList.add("playlist-button");
    myButtonDom.innerHTML = '<span class="vjs-icon-audio-description"></span>';
    myButtonDom.style.fontSize = "medium";
    // Setting control text for the button hover effect
    myButton.controlText("Turn on Video Description");
  


    let currentVideoSource = options.sources[0].src;
    let currentTime = 0;

    // Setting the control button click function
    myButtonDom.onclick = function () {
      // Remember the current playback time
      currentTime = player.currentTime();
      console.log("Current playback time", currentTime);

      // Toggle between video sources
      if (currentVideoSource === options.sources[0].src) {
        currentVideoSource = options.sources[1].src;
      } else {
        currentVideoSource = options.sources[0].src;
      }

      // Update the source of the video player
      player.src({ type: "video/mp4", src: currentVideoSource });

      // Load and play the new video
      player.load();

      // Set the playback time to the remembered time
      player.on("loadedmetadata", function () {
        player.currentTime(currentTime);
        // player.play();
      });
    };
  });
});
