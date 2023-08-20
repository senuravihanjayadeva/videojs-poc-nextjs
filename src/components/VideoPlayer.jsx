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

      if (!options.playlist) {
        //Use Custom Chapter Plugin
        options.sources[0].chapters &&
          player.customSelectChapterList(options.sources[0].chapters);

        //Use Custom Chapter in Seekbar Plugin
        options.sources[0].chapters &&
          player.customChaptersInSeekbar(options.sources[0].chapters);

        //Use Custom Video Quality Plugin
        player.customVideoQualityChanger(options.sources);
      } else {
        //Use Custom Playlist Plugin
        player.customPlaylist(options.playlist);

        //Use Custom Playlist Popup Plugin
        player.customPlaylistPopup(options.playlist);
      }
      //Use Custom Language Support Plugin
      player.customLanguageSupport();

      //Use Custom Annotation Plugin
      options.annotation && player.customAnnotation(options.annotation);

      //Use Custom hover Over Parser Plugin
      options.hoverParsers &&
        player.customHoverOverParser(options.hoverParsers);

      //Use custom In Screen Navigation Plugin
      options.screenNavigation &&
        options.sources[0].chapters &&
        player.customInScreenNavigation(options.sources[0].chapters);

      options.externalConceptCheck && player.customExternalConceptCheck();
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
