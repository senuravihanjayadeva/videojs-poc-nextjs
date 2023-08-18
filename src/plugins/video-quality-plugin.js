import videojs from 'video.js';

videojs.registerPlugin('customVideoQualityChanger', function(sourceList) {
  const player = this;
  const selectBoxContainer = document.createElement("div");
  selectBoxContainer.classList.add("custom-select-container");
  const selectBox = document.createElement("select");

  sourceList.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option.src;
    opt.text = option.quality;
    selectBox.appendChild(opt);
  });

  selectBox.onchange = function () {
    const source = this.value;
    const player = playerRef.current;
    console.log(source);
    player.src(source);
  };

  selectBoxContainer.appendChild(selectBox);
  player.controlBar.el().appendChild(selectBoxContainer);
});