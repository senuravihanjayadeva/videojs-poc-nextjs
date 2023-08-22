import videojs from "video.js";

videojs.registerPlugin("customLanguageSupport", function () {
  const player = this;

  player.ready(() => {
    let myButton = player.controlBar.addChild(
      "button",
      {},
      player.controlBar.children().length - 1
    );

    // Create our button's DOM Component
    let selectBoxContainer = myButton.el();
    selectBoxContainer.id = "custom-select-language";
    selectBoxContainer.classList.add("custom-select-language");
    selectBoxContainer.classList.add("vjs-button");

    const selectBox = document.createElement("select");
    selectBox.id = "language-select-box";
    // styles for the select
    selectBox.style.backgroundColor = "transparent";
    selectBox.style.cursor = "pointer";

    const list = ["en", "ar", "pt", "es"];

    let languageParam = getQueryLang();

    list.forEach((option) => {
      const opt = document.createElement("option");
      // styles for the option
      opt.style.backgroundColor = "rgb(109, 110, 111)";
      opt.style.padding = "3px";
      opt.value = option;
      opt.text = option;
      if(languageParam === option){
        opt.selected = true;
      }
      selectBox.appendChild(opt);
    });

    selectBox.onchange = function () {
      const newLanguage = this.value;
      // player.language(newLanguage);
      window.location.href = getLatestUrl(newLanguage);
    };

    selectBoxContainer.appendChild(selectBox);
  });
});

function getQueryLang() {
  let originalURL = window.location.href;

  // Extract the base URL and query parameters
  let queryParams = originalURL.split("?")[1];

  // Create a new array to store updated parameter pairs
  let langQueryValue = "en";

  if (queryParams) {
    // Split query parameters into individual pairs
    let paramPairs = queryParams.split("&");

    // Loop through each parameter pair
    for (let i = 0; i < paramPairs.length; i++) {
      let paramPair = paramPairs[i];
      let paramName = paramPair.split("=")[0];
      let paramValue = paramPair.split("=")[1];

      if (paramName === "lang") {
        // Replace the lang parameter value
        langQueryValue = paramValue;
      }
    }
  } 

  return langQueryValue;
}

function getLatestUrl(newLanguage) {
  let originalURL = window.location.href;

  // Extract the base URL and query parameters
  let baseURL = originalURL.split("?")[0];
  let queryParams = originalURL.split("?")[1];

  // Create a new array to store updated parameter pairs
  let newParamPairs = [];

  if (queryParams) {
    // Split query parameters into individual pairs
    let paramPairs = queryParams.split("&");

    // Loop through each parameter pair
    for (let i = 0; i < paramPairs.length; i++) {
      let paramPair = paramPairs[i];
      let paramName = paramPair.split("=")[0];
      let paramValue = paramPair.split("=")[1];

      if (paramName === "lang") {
        // Replace the lang parameter value
        paramValue = newLanguage;
      }

      newParamPairs.push(paramName + "=" + paramValue);
    }
  } else {
    newParamPairs.push("lang" + "=" + newLanguage);
  }

  // Construct the new URL with updated parameters
  var newURL = baseURL + "?" + newParamPairs.join("&");
  return newURL;
}
