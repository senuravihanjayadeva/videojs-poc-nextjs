"use client";
import Image from "next/image";
import React, { useRef } from "react";
import VideoPlayer from "../components/VideoPlayer";

const completedItems = [
  "Play-Pause",
  "Mute-Unmute",
  "Full Screen",
  "Annotation: /annotation",
  "Speed Control",
  "Redition Control",
  "Multi Language Support",
  "Playlist: /playlist",
  "Audio Player: /audio",
  "Chaptering",
  "Hover the credit line: /hoverover",
];

const pendingItems = [
  "Frame by Frame",
  "Setting",
  "In Screen Navigation",
  "Timestamp",
  "Clips",
  "Concept Check (Internal and External)",
];

export default function Home() {
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
    responsive: true,
    // poster: SampleImage,
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
      {
        src: "https://firebasestorage.googleapis.com/v0/b/sri-lanka-airlines-storage.appspot.com/o/sample720.mp4?alt=media&token=50b250ab-3845-4321-94d1-49987a4d706b",
        type: "video/mp4",
        quality: "720p",
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
      <h1 className="text-3xl font-bold">Demo App - CloudFlicks</h1>
      <hr />
      <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      <br />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Features List</h1>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-green-600">
              Completed
            </h3>
            <ul>
              {completedItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-orange-600">
              Pending
            </h3>
            <ul>
              {pendingItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
