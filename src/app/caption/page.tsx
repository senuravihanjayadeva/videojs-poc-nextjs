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
        src: "https://firebasestorage.googleapis.com/v0/b/videos-f6df6.appspot.com/o/y2mate.is%20-%20DeSTiNY%20ANiMaTioN%20%20~%20%20NO%20SouND%20(university%20project)-IsgM7HjEVKU-360p-1692625619.mp4?alt=media&token=79d92f99-58e5-4249-9ba1-a0684ce2ea1d",
        type: "video/mp4",
        quality: "360p",
      },
    ],
    plugins: {
      customCaption: {
        captions: [
          {
            src: "http://localhost:3000/example.en.vtt",
            kind: "descriptions",
            srclang: "en",
            label: "Audio Description",
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
