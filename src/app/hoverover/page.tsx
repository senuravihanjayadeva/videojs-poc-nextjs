"use client";

import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useRef } from "react";

export default function HoverOver() {
  const playerRef = useRef(null);

  const hoverParsers = [
    {
      px: "7",
      py: "30",
      pw: "45",
      ph: "55",
      cx: "20",
      cy: "50",
      cw: "20",
      ch: "auto",
      starttime: "3",
      endtime: "15",
      text: "This is test 1",
    },
    {
      px: "48",
      py: "40",
      pw: "45",
      ph: "55",
      cx: "60",
      cy: "50",
      cw: "20",
      ch: "auto",
      starttime: "3",
      endtime: "15",
      text: "This is test 2",
    },
  ];

  const videoJsOptions = {
    hoverParsers: hoverParsers,
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
        src: "https://firebasestorage.googleapis.com/v0/b/sri-lanka-airlines-storage.appspot.com/o/sample360.mp4?alt=media&token=7e4fb99e-0205-4042-90ff-080c0d091c42",
        type: "video/mp4",
        quality: "360p",
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
