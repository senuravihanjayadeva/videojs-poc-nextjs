import videojs from "video.js";
import "./playlist.css";

videojs.registerPlugin("customInScreenNavigation", function (chaptersArray) {
  const player = this;
  let currentChaperIndex = 0;
  // Initialize the chapters manually
  const chapterMarkers = chaptersArray.map((chapter) => {
    return {
      text: chapter.label,
      time: chapter.time,
    };
  });

  // Create the div element
  let showChapterEl = document.createElement("div");
  showChapterEl.id = "screen-chaper-div";
  showChapterEl.className = "screen-chaper-div";
  showChapterEl.style.position = "absolute";
  showChapterEl.style.bottom = `5%`; // Adjust the y-coordinate
  showChapterEl.style.right = `10%`; // Adjust the x-coordinate
  showChapterEl.style.width = `8%`; // Adjust the x-coordinate
  showChapterEl.style.backgroundColor = `#ffffff`;
  showChapterEl.style.textAlign = "center";
  showChapterEl.style.padding = "3px";
  showChapterEl.style.color = `#000000`;
  showChapterEl.style.fontSize = `large`;

  showChapterEl.innerHTML = `${currentChaperIndex} / ${chaptersArray.length}`;
  player.el().appendChild(showChapterEl);

  // Create the back button element
  let backButton = document.createElement("button");
  backButton.id = "screen-btn";
  backButton.className = "screen-btn";
  backButton.style.position = "absolute";
  backButton.style.bottom = `5%`; // Adjust the y-coordinate
  backButton.style.right = `20%`; // Adjust the x-coordinate
  backButton.style.fontSize = `large`;
  backButton.innerHTML = '<span class="vjs-icon-previous-item"></span>';
  player.el().appendChild(backButton);

  // Setting the back button click function
  backButton.onclick = function () {
    currentChaperIndex -= 1;
    const selectedChapter = chapterMarkers[currentChaperIndex];
    if (selectedChapter) {
      player.currentTime(selectedChapter.time);
      showChapterEl.innerHTML = `${currentChaperIndex} / ${chaptersArray.length}`;
    }
  };

  // Create the next button element
  let nextButton = document.createElement("button");
  nextButton.id = "screen-btn";
  nextButton.className = "screen-btn";
  nextButton.style.position = "absolute";
  nextButton.style.bottom = `5%`; // Adjust the y-coordinate
  nextButton.style.right = `7%`; // Adjust the x-coordinate
  nextButton.style.fontSize = `large`;
  nextButton.innerHTML = '<span class="vjs-icon-next-item"></span>';
  player.el().appendChild(nextButton);

  // Setting the next button click function
  nextButton.onclick = function () {
    currentChaperIndex += 1;
    const selectedChapter = chapterMarkers[currentChaperIndex];
    if (selectedChapter) {
      player.currentTime(selectedChapter.time);
      showChapterEl.innerHTML = `${currentChaperIndex} / ${chaptersArray.length}`;
    }
  };
});
