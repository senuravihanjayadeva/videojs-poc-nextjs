import videojs from "video.js";

videojs.registerPlugin("customSelectChapterList", function (options) {
  const player = this;

  player.ready(() => {
    let currentChaperIndex = 0;
    let currentChaperLabel = 0;

    // Initialize the chapters manually
    const chapterMarkers = options.chapters.map((chapter) => {
      return {
        text: chapter.label,
        time: chapter.time,
      };
    });

    //Mark seekbar with points
    markSeekbarWithPoints(player, chapterMarkers);

    // Create the back button element
    let chapterControlbarDiv = document.createElement("div");
    chapterControlbarDiv.id = "chapter-controlbar-div";

    // Create the back button element
    let chapterRow = document.createElement("div");
    chapterRow.className = "chapter-controlbar-row";

    let chapterColumnLeft = document.createElement("div");
    chapterColumnLeft.className = "chapter-controlbar-column";

    // Create the back button element
    let backButton = document.createElement("button");
    backButton.id = "screen-btn";
    backButton.className = "screen-btn";
    backButton.style.fontSize = `small`;
    backButton.innerHTML = '<span class="vjs-icon-previous-item"></span>';

    // Setting the back button click function
    backButton.onclick = function () {
      if (currentChaperIndex !== 0) {
        currentChaperIndex -= 1;
        const selectedChapter = chapterMarkers[currentChaperIndex];
        if (selectedChapter) {
          player.currentTime(selectedChapter.time);
          currentChaperLabel = currentChaperIndex + 1;
          showChapterEl.innerHTML = `${currentChaperLabel} / ${options.chapters.length}`;
        }
      }
    };

    chapterColumnLeft.appendChild(backButton);
    chapterRow.appendChild(chapterColumnLeft);


    let chapterColumnMiddle = document.createElement("div");
    chapterColumnMiddle.className = "chapter-controlbar-column";

    // Create the div element
    let showChapterEl = document.createElement("p");
    // showChapterEl.id = "controlbar-chaper-div";
    // showChapterEl.className = "controlbar-chaper-div";
    showChapterEl.style.backgroundColor = `#ffffff`;
    showChapterEl.style.textAlign = "center";
    showChapterEl.style.padding = "3px";
    showChapterEl.style.color = `#000000`;
    showChapterEl.style.fontSize = `small`;

    currentChaperLabel = currentChaperIndex + 1;
    showChapterEl.innerHTML = `${currentChaperLabel} / ${options.chapters.length}`;

    chapterColumnMiddle.appendChild(showChapterEl)
    chapterRow.appendChild(chapterColumnMiddle);

    let chapterColumnRight = document.createElement("div");
    chapterColumnRight.className = "chapter-controlbar-column";
    // Create the next button element
    let nextButton = document.createElement("button");
    nextButton.id = "screen-btn";
    nextButton.className = "screen-btn";
    nextButton.style.fontSize = `small`;
    nextButton.innerHTML = '<span class="vjs-icon-next-item"></span>';
    
    // Setting the next button click function
    nextButton.onclick = function () {
      if (currentChaperIndex !== chapterMarkers.length) {
        currentChaperIndex += 1;
        const selectedChapter = chapterMarkers[currentChaperIndex];
        if (selectedChapter) {
          player.currentTime(selectedChapter.time);
          currentChaperLabel = currentChaperIndex + 1;
          showChapterEl.innerHTML = `${currentChaperLabel} / ${options.chapters.length}`;
        }
      }
    };

    chapterColumnRight.appendChild(nextButton)
    chapterRow.appendChild(chapterColumnRight);

    chapterControlbarDiv.appendChild(chapterRow)

    player.controlBar.el().appendChild(chapterControlbarDiv);

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
        showChapterEl.innerHTML = `${currentChaperLabel} / ${options.chapters.length}`;
      }
    });
  });
});

function markSeekbarWithPoints(player, chapterMarkers) {
  // Add chapter markers and tooltips to the seek bar
  const progressControl = player.controlBar.progressControl;
  const seekBar = progressControl.seekBar.el();

  // Listen for the 'loadedmetadata' event to ensure the duration is available
  player.on("loadedmetadata", function () {
    const duration = player.duration(); // Total video duration in seconds

    chapterMarkers.forEach((chapter, index) => {
      const marker = document.createElement("div");
      marker.classList.add("chapter-marker");
      marker.id = `chapter-marker-${index}`;
      marker.style.left = (chapter.time / duration) * 100 + "%";

      // Create tooltip for chapter label
      const tooltip = document.createElement("div");
      tooltip.classList.add("chapter-tooltip");
      tooltip.textContent = chapter.text;

      marker.onclick = () => {
        player.currentTime(chapter.time);
      };

      marker.appendChild(tooltip);

      seekBar.appendChild(marker);
    });
  });
}
