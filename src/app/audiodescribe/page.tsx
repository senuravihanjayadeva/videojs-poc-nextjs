"use client";
import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useRef } from "react";

export default function AudioDescribe() {
  const playerRef = useRef(null);

  const videoJsOptions = {
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
        src: "https://firebasestorage.googleapis.com/v0/b/sri-lanka-airlines-storage.appspot.com/o/videojs%2Faddisable.mp4?alt=media&token=b356d81d-b17a-4e18-8907-3da969c2a046",
        type: "video/mp4",
        quality: "360p",
      },
    ],
    plugins: {
      customAudioDescribe: {
        sources: [
          {
            src: "https://firebasestorage.googleapis.com/v0/b/sri-lanka-airlines-storage.appspot.com/o/videojs%2Faddisable.mp4?alt=media&token=b356d81d-b17a-4e18-8907-3da969c2a046",
            type: "video/mp4",
            quality: "360p",
          },
          {
            src: "https://firebasestorage.googleapis.com/v0/b/sri-lanka-airlines-storage.appspot.com/o/videojs%2Fadenable.mp4?alt=media&token=00ff67c7-b5a3-4895-8aa1-2cad5a51d1e3",
            type: "video/mp4",
            quality: "360p",
          },
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
