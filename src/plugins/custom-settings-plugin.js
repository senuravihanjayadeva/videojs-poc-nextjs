import videojs from "video.js";

videojs.registerPlugin("customSettings", function () {
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
    myButtonDom.classList.add("settings-button");
    myButtonDom.innerHTML = '<button class="vjs-icon-cog"></button>';

    // Setting control text for the button hover effect
    myButton.controlText("Settings");
    // myButton.addClass('vjs-visible-text');

    // Create the popup element
    let popup = document.createElement("div");
    popup.id = "custom-settings-popup-panel";
    popup.className = "custom-settings-popup-panel";

    //Language Select Row
    createLanguageSelectSetting(popup);
    //Video Quality Select Row
    createQualitySelectSetting(popup);
    //Video Speed Select Row
    createSpeedSelectSetting(popup)

    // Setting the control button click function
    myButtonDom.onclick = function () {
      const videoDoc = document.getElementById("video-js");
      const existingPopup = videoDoc.querySelector(
        "#custom-settings-popup-panel"
      );
      if (existingPopup) {
        videoDoc.removeChild(existingPopup);
      } else {
        videoDoc.appendChild(popup);
      }
    };

    player.on('click', function(evt) { 
      if (evt.target.tagName === 'VIDEO' || evt.target.tagName === 'SPAN') {
        popup.remove(); 
      }
    });
  });
});

function createLanguageSelectSetting(popup) {
  let settingItem = document.createElement("div");
  settingItem.className = "custom-setting-item-row";

  let colSettingItemLeft = document.createElement("div");
  colSettingItemLeft.className = "custom-setting-item-col";
  let paragraphItem = document.createElement("p");
  paragraphItem.textContent = "Language";
  colSettingItemLeft.appendChild(paragraphItem);

  let colSettingItemRight = document.createElement("div");
  colSettingItemRight.id = "custom-setting-item-col-language";
  colSettingItemRight.className = "custom-setting-item-col";

  const languageSelectBox = document.getElementById("custom-select-language");
  languageSelectBox.id = "language-select-box-1";
  if (languageSelectBox) {
    colSettingItemRight.appendChild(languageSelectBox);
  }

  settingItem.appendChild(colSettingItemLeft);
  settingItem.appendChild(colSettingItemRight);

  popup.appendChild(settingItem);
}

function createQualitySelectSetting(popup) {
  let settingItem = document.createElement("div");
  settingItem.className = "custom-setting-item-row";

  let colSettingItemLeft = document.createElement("div");
  colSettingItemLeft.className = "custom-setting-item-col";
  let paragraphItem = document.createElement("p");
  paragraphItem.textContent = "Quality";
  colSettingItemLeft.appendChild(paragraphItem);

  let colSettingItemRight = document.createElement("div");
  colSettingItemRight.id = "custom-setting-item-col-quality";
  colSettingItemRight.className = "custom-setting-item-col";

  const videoQualitySelectBox = document.getElementById(
    "custom-select-quality"
  );
  if (videoQualitySelectBox) {
    colSettingItemRight.appendChild(videoQualitySelectBox);
  }

  settingItem.appendChild(colSettingItemLeft);
  settingItem.appendChild(colSettingItemRight);

  popup.appendChild(settingItem);
}

function createSpeedSelectSetting(popup) {
  let settingItem = document.createElement("div");
  settingItem.className = "custom-setting-item-row";

  let colSettingItemLeft = document.createElement("div");
  colSettingItemLeft.className = "custom-setting-item-col";
  let paragraphItem = document.createElement("p");
  paragraphItem.textContent = "Speed";
  colSettingItemLeft.appendChild(paragraphItem);

  let colSettingItemRight = document.createElement("div");
  colSettingItemRight.id = "custom-setting-item-col-speed";
  colSettingItemRight.className = "custom-setting-item-col";

  const videoSpeedSelectBox = document.getElementById(
    "custom-speed-select-box"
  );
  if (videoSpeedSelectBox) {
    colSettingItemRight.appendChild(videoSpeedSelectBox);
  }else{
    console.log("hello")
  }

  settingItem.appendChild(colSettingItemLeft);
  settingItem.appendChild(colSettingItemRight);

  popup.appendChild(settingItem);
}
