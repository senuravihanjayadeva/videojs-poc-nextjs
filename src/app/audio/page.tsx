"use client";
import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useRef } from "react";

export default function Audio() {
  const playerRef = useRef(null);

  const videoJsOptions = {
    audioOnlyMode: true,
    autoplay: true,
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
    controlBar: {
      skipButtons: {
        backward: 10,
        forward: 10,
      },
    },
    fluid: true,
    sources: [
      {
        src: "https://firebasestorage.googleapis.com/v0/b/sri-lanka-airlines-storage.appspot.com/o/videojs%2Fsample320p.mp4?alt=media&token=b2676813-9b6e-478a-9916-39502e6a37fd",
        type: "video/mp4",
        quality: "360p",
        chapters: [
          { label: "Chapter 1", time: "0" },
          { label: "Chapter 2", time: "20" },
          { label: "Chapter 3", time: "40" },
          { label: "Chapter 4", time: "60" },
          { label: "Chapter 5", time: "90" },
          { label: "Chapter 6", time: "110" },
          { label: "Chapter 7", time: "140" },
        ],
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      // videojs.log('player is waiting');
    });

    player.on("dispose", () => {
      // videojs.log('player will dispose');
    });
  };

  return (
    <div style={{ padding: "5% 10%" }}>
      <Features>
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </Features>
    </div>
  );
}
