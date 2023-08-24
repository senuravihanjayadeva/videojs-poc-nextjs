"use client";
import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useRef } from "react";

export default function ExternalConceptCheck() {
  const playerRef = useRef(null);
  // Define an array of pause time ranges (in seconds)

  const questions = [
    {
      starttime: 11,
      endtime: 12,
      question: "What does the term hoisting refer to in JavaScript?",
      answers: [
        {
          id: "1",
          value: "A",
          label: " ( A )",
          starttime: 12,
          px: "4",
          py: "35",
        },
        {
          id: "2",
          value: "B",
          label: " ( B )",
          starttime: 304,
          px: "4",
          py: "61",
        },
        {
          id: "3",
          value: "C",
          label: " ( C )",
          starttime: 387,
          px: "4",
          py: "84",
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
    // Add more time ranges as needed
  ];

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    language: "pt", // Set the language to Spanish
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
      customExternalConceptCheck: {
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
