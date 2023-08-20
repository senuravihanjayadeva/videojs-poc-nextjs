import videojs from "video.js";
import "./playlist.css";

videojs.registerPlugin("customInScreenNavigation", function (chaptersArray) {
  const player = this;
  let currentChaperIndex = 0;
  let currentChaperLabel = 0;
  const yCoordinate = "12";
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
  showChapterEl.style.bottom = `${yCoordinate}%`; // Adjust the y-coordinate
  showChapterEl.style.right = `10%`; // Adjust the x-coordinate
  showChapterEl.style.width = `8%`; // Adjust the x-coordinate
  showChapterEl.style.backgroundColor = `#ffffff`;
  showChapterEl.style.textAlign = "center";
  showChapterEl.style.padding = "3px";
  showChapterEl.style.color = `#000000`;
  showChapterEl.style.fontSize = `x-large`;

  currentChaperLabel = currentChaperIndex + 1;
  showChapterEl.innerHTML = `${currentChaperLabel} / ${chaptersArray.length}`;
  player.el().appendChild(showChapterEl);

  // Create the back button element
  let backButton = document.createElement("button");
  backButton.id = "screen-btn";
  backButton.className = "screen-btn";
  backButton.style.position = "absolute";
  backButton.style.bottom = `${yCoordinate}%`; // Adjust the y-coordinate
  backButton.style.right = `20%`; // Adjust the x-coordinate
  backButton.style.fontSize = `x-large`;
  backButton.innerHTML = '<span class="vjs-icon-previous-item"></span>';
  player.el().appendChild(backButton);

  // Setting the back button click function
  backButton.onclick = function () {
    if (currentChaperIndex !== 0) {
      currentChaperIndex -= 1;
      const selectedChapter = chapterMarkers[currentChaperIndex];
      if (selectedChapter) {
        player.currentTime(selectedChapter.time);
        currentChaperLabel = currentChaperIndex + 1;
        showChapterEl.innerHTML = `${currentChaperLabel} / ${chaptersArray.length}`;
      }
    }
  };

  // Create the next button element
  let nextButton = document.createElement("button");
  nextButton.id = "screen-btn";
  nextButton.className = "screen-btn";
  nextButton.style.position = "absolute";
  nextButton.style.bottom = `${yCoordinate}%`; // Adjust the y-coordinate
  nextButton.style.right = `5%`; // Adjust the x-coordinate
  nextButton.style.fontSize = `x-large`;
  nextButton.innerHTML = '<span class="vjs-icon-next-item"></span>';
  player.el().appendChild(nextButton);

  // Setting the next button click function
  nextButton.onclick = function () {
    if (currentChaperIndex !== chapterMarkers.length) {
      currentChaperIndex += 1;
      const selectedChapter = chapterMarkers[currentChaperIndex];
      if (selectedChapter) {
        player.currentTime(selectedChapter.time);
        currentChaperLabel = currentChaperIndex + 1;
        showChapterEl.innerHTML = `${currentChaperLabel} / ${chaptersArray.length}`;
      }
    }
  };

  // Chapter navigation logic
  player.on("timeupdate", () => {
    nextButton.style.color = "absolute";
    const currentTime = player.currentTime();
    // Find the current chapter based on currentTime
    let currentChapter = null;
    for (const chapter of chapterMarkers) {
      if (currentTime >= chapter.time) {
        currentChapter = chapter;
      } else {
        break;
      }
      let latestChapterIndex = chapterMarkers.findIndex(checkChapterIndex);
      function checkChapterIndex(chapter) {
        return chapter.text == currentChapter.text;
      }
      currentChaperIndex = latestChapterIndex;
      currentChaperLabel = latestChapterIndex + 1;
      showChapterEl.innerHTML = `${currentChaperLabel} / ${chaptersArray.length}`;
    }
  });
});
