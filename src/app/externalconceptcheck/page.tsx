"use client";
import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useRef } from "react";

export default function Home() {
  const playerRef = useRef(null);
  // Define an array of pause time ranges (in seconds)

  const questions = [
    {
      start: 3,
      end: 4,
      question: "What does the term hoisting refer to in JavaScript?",
      answers: [
        { id: "1", value: "A", label: " ( A )", starttime: 10 },
        { id: "2", value: "B", label: " ( B )", starttime: 25 },
        { id: "3", value: "C", label: " ( C )", starttime: 40 },
      ],
    },
    {
      start: 60,
      end: 61,
      question: "What is the difference between null and undefined in JavaScript?",
      answers: [
        { id: "1", value: "A", label: " ( A )", starttime: 85 },
        { id: "2", value: "B", label: " ( B )", starttime: 115 },
        { id: "3", value: "C", label: " ( C ) ", starttime: 130 },
      ],
    },
    // Add more time ranges as needed
  ];

  const videoJsOptions = {
    externalConceptCheck: true,
    autoplay: true,
    controls: true,
    responsive: true,
    questions: questions,
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
        src: "https://firebasestorage.googleapis.com/v0/b/videos-f6df6.appspot.com/o/sample360.mp4?alt=media&token=f84ab19c-5d7f-49c3-9597-75b3c8b59b71",
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
