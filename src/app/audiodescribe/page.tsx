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
        src: "https://firebasestorage.googleapis.com/v0/b/videos-f6df6.appspot.com/o/PS116ZNW.mp4?alt=media&token=b71ad4c8-2162-413e-80c1-c89df1476279",
        type: "video/mp4",
        quality: "360p",
      },
    ],
    plugins: {
      customAudioDescribe: {
        sources: [
          {
            src: "https://firebasestorage.googleapis.com/v0/b/videos-f6df6.appspot.com/o/PS116ZNW.mp4?alt=media&token=b71ad4c8-2162-413e-80c1-c89df1476279",
            type: "video/mp4",
            quality: "360p",
          },
          {
            src: "https://firebasestorage.googleapis.com/v0/b/videos-f6df6.appspot.com/o/PS116W1K.mp4?alt=media&token=08c8c9ed-2763-4fc9-828b-5037420369c5",
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
