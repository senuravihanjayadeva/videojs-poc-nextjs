"use client";
import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useRef } from "react";

export default function Annotation() {
  const playerRef = useRef(null);

  const annotation = [
    {
      x: "7",
      y: "47",
      height: "35",
      width: "30",
      starttime: "3",
      endtime: "15",
    },
    {
      x: "41",
      y: "46",
      height: "36",
      width: "48",
      starttime: "5",
      endtime: "15",
    },
  ];

  const videoJsOptions = {
    annotation: annotation,
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
      <h3 className="text-3xl font-bold">Demo App - CloudFlicks</h3>
      <hr />
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      <br/>
      <Features/>
    </div>
  );
}
