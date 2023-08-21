"use client";
import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useRef } from "react";

export default function FrameByFrame() {
  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
    fluid: true,
    sources: [
      {
        src: "https://firebasestorage.googleapis.com/v0/b/videos-f6df6.appspot.com/o/framebyframe.mp4?alt=media&token=304b6b23-87eb-4a5b-84c8-6b6a9b930897",
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
