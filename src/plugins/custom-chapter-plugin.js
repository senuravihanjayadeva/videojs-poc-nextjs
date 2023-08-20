import videojs from 'video.js';
import "./custom-chapter-plugin.css";

videojs.registerPlugin('customSelectChapterList', function(chaptersArray) {
  const player = this;
  let prevSelectBoxContainer = document.getElementById(
    "custom-select-container-playlist"
  );
  if (prevSelectBoxContainer) {
    prevSelectBoxContainer.remove();
  }

  let myButton = player.controlBar.addChild(
    "button",
    {},
    player.controlBar.children().length
  );
  
  // Create our button's DOM Component
  let selectBoxContainer = myButton.el();
  selectBoxContainer.style.marginRight = "4%"
  selectBoxContainer.id = "custom-select-container-chapter";
  selectBoxContainer.classList.add("vjs-button");
  selectBoxContainer.classList.add("custom-select-chapter");


  const selectBox = document.createElement("select");
  selectBox.style.backgroundColor = "transparent";
  selectBox.style.cursor = "pointer";
  // Initialize the chapters manually
  const chapterMarkers = chaptersArray.map((chapter) => {
    return {
      text: chapter.label,
      time: chapter.time,
    };
  });

  const chapterOptions = chaptersArray.map((chapter, index) => {
    return {
      value: index.toString(),
      text: chapter.label,
    };
  });

  chapterOptions.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.text = option.text;
    selectBox.appendChild(opt);
  });

  selectBox.onchange = function () {
    const selectedChapterIndex = parseInt(this.value, 10);
    if (!isNaN(selectedChapterIndex)) {
      const selectedChapter = chapterMarkers[selectedChapterIndex];
      if (selectedChapter) {
        player.currentTime(selectedChapter.time);
      }
    }
  };

  selectBoxContainer.appendChild(selectBox);
  player.controlBar.el().appendChild(selectBoxContainer);
});
