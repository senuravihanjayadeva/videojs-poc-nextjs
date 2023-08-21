import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import "../plugins/custom-chapter-plugin.js";
import "../plugins/custom-playlist-plugin.js";
import "../plugins/custom-playlist-popup-plugin.js";
import "../plugins/custom-chapter-seekbar.js";
import "../plugins/custom-language-support.js";
import "../plugins/video-quality-plugin.js";
import "../plugins/custom-annotation-plugin.js";
import "../plugins/custom-hover-over-parser-plugin.js";
import "../plugins/custom-in-screen-navigation-plugin.js";
import "../plugins/custom-external-concept-check-plugin.js";
import "../plugins/custom-timestamp-plugin";
import "../plugins/videojs.framebyframe.js";
import "../plugins/videojs.framebyframe.css";
import "../plugins/custom-caption-plugin.js";
import "../plugins/custom-audio-describe-plugin.js";
import "../plugins/custom-internal-concept-check-plugin.js";
import "../plugins/custom-internal-concept-check.css"

export const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.id = "video-js";
      videoElement.classList.add("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));

      //Use Custom Video Quality Plugin
      player.customVideoQualityChanger(options);

      //Use Custom Language Support Plugin
      player.customLanguageSupport();
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
