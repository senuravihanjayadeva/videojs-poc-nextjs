import videojs from "video.js";
import "videojs-playlist";
import "./playlist.css";

videojs.registerPlugin("customPlaylistPopup", function (options) {
  const player = this;

  player.ready(() => {
    // Add playlist functionality
    player.playlist(options.playlist);

    // Load the playlist
    player.playlist.currentItem(0); // Start playing the first video in the playlist

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
    myButtonDom.innerHTML = '<span class="vjs-icon-chapters"></span>';

    // Setting control text for the button hover effect
    myButton.controlText("Playlist");

    // Create the popup element
    let popup = document.createElement("div");
    popup.id = "popup-panel";
    popup.className = "playlist-popup-panel custom-row";

    options.playlist.forEach((item, index) => {
      let divGrid = document.createElement("div");
      divGrid.className = "popup-div-grid custom-col";
      let paragraph = document.createElement("p");
      paragraph.innerHTML = item.title;
      // Append the paragraphs to the popup element
      divGrid.appendChild(paragraph);
      divGrid.onclick = () => {
        player.playlist.currentItem(index);
        popup.remove();
        return false;
      };
      popup.appendChild(divGrid);
    });

    // Setting the control button click function
    myButtonDom.onclick = function () {
      const videoDoc = document.getElementById("video-js");
      const existingPopup = videoDoc.querySelector("#popup-panel");
      if (existingPopup) {
        videoDoc.removeChild(existingPopup);
      } else {
        videoDoc.appendChild(popup);
      }
    };
  });
});
