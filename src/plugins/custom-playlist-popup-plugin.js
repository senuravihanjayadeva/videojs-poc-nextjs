import videojs from 'video.js';
import "./playlist.css";

videojs.registerPlugin('customPlaylistPopup', function(list) {
   const player = this;
   // Adding button to the control bar
   var myButton = player.controlBar.addChild("button", {}, 0);

   // Create our button's DOM Component
   var myButtonDom = myButton.el();
 
   myButtonDom.innerHTML = '<span class="vjs-icon-chapters"></span>';
 
   // Setting control text for the button hover effect
   myButton.controlText("Playlist");
 
   // Create the popup element
   let popup = document.createElement("div");
   popup.id = "popup-panel";
   popup.className = "playlist-popup-panel custom-row";
 
   list.forEach((item, index) => {
     let divGrid = document.createElement("div");
     divGrid.className = "popup-div-grid custom-col";
     let paragraph = document.createElement("p");
     paragraph.innerHTML = item.title;
     // Append the paragraphs to the popup element
     divGrid.appendChild(paragraph);
     divGrid.onclick = () => {
       
       //This is for chapter select box plugin
       if (item.sources[0].chapters) {
         player.customSelectChapterList(item.sources[0].chapters);
       }
       //End of This is for chapter select box plugin
 
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
