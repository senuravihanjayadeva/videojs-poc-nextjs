"use client";

import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useRef } from "react";

export default function InternalConceptCheck() {
  const playerRef = useRef(null);

  const questions = [
    {
      starttime: 3,
      endtime: 4,
      question: "What does the term hoisting refer to in JavaScript?",
      answers: [
        {
          id: "1",
          value: "A",
          label: " ( A )",
          starttime: 10,
          px: "7",
          py: "25",
          cx: "2",
          cy: "15",
          cw: "500px",
          ch: "80px",
        },
        {
          id: "2",
          value: "B",
          label: " ( B )",
          starttime: 25,
          px: "7",
          py: "37",
          cx: "2",
          cy: "35",
          cw: "500px",
          ch: "80px",
        },
        {
          id: "3",
          value: "C",
          label: " ( C )",
          starttime: 40,
          px: "7",
          py: "50",
          cx: "2",
          cy: "65",
          cw: "500px",
          ch: "80px",
        },
      ],
    },
    {
      starttime: 60,
      endtime: 61,
      question:
        "What is the difference between null and undefined in JavaScript?",
      answers: [
        {
          id: "1",
          value: "A",
          label: " ( A )",
          starttime: 85,
          px: "7",
          py: "25",
        },
        {
          id: "2",
          value: "B",
          label: " ( B )",
          starttime: 115,
          px: "7",
          py: "35",
        },
        {
          id: "3",
          value: "C",
          label: " ( C )",
          starttime: 130,
          px: "7",
          py: "55",
        },
      ],
    },
  ];

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
        src: "https://firebasestorage.googleapis.com/v0/b/sri-lanka-airlines-storage.appspot.com/o/videojs%2Fsample320p.mp4?alt=media&token=b2676813-9b6e-478a-9916-39502e6a37fd",
        type: "video/mp4",
        quality: "360p",
      },
    ],
    plugins: {
      customInternalConceptCheck: {
        questions: questions,
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
