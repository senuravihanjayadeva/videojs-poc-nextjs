"use client";
import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useRef } from "react";

export default function FrameByFrame() {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
    fluid: true,
    sources: [
      {
        src: "https://firebasestorage.googleapis.com/v0/b/sri-lanka-airlines-storage.appspot.com/o/videojs%2Fframebyframe.mp4?alt=media&token=58ca4a7a-e948-4078-9524-dd94f9129d41",
        type: "video/mp4",
        quality: "480p",
      },
    ],
    plugins: {
      framebyframe: {
        fps: 30,
        steps: [
          { text: "< 1f", step: -1 },
          { text: "1f >", step: 1 },
        ],
      },
    },
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
