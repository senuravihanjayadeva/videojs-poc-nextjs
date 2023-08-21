"use client";
import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useRef } from "react";

export default function Playlist() {
  const playerRef = useRef(null);
  let playlist = [
    {
      sources: [
        {
          src: "http://media.w3.org/2010/05/video/movie_300.mp4",
          type: "video/mp4",
          quality: "360p",
          chapters: [
            { label: "Chapter 1", time: "0" },
            { label: "Chapter 2", time: "20" },
            { label: "Chapter 3", time: "40" },
            { label: "Chapter 4", time: "90" },
            { label: "Chapter 5", time: "120" },
            { label: "Chapter 6", time: "150" },
            { label: "Chapter 7", time: "170" },
          ],
        },
      ],
      title: "Video Intial",
      // poster: SampleImage,
    },
    {
      sources: [
        {
          src: "http://techslides.com/demos/sample-videos/small.mp4",
          type: "video/mp4",
          quality: "360p",
          chapters: [
            { label: "Chapter 1", time: "0" },
            { label: "Chapter 2", time: "3" },
          ],
        },
      ],
      title: "Video One",
      // poster: SampleImage,
    },
    {
      sources: [
        {
          src: "http://vjs.zencdn.net/v/oceans.mp4",
          type: "video/mp4",
        },
      ],
      title: "Video Two",
      // poster: SampleImage,
    },
    {
      sources: [
        {
          src: "http://techslides.com/demos/sample-videos/small.mp4",
          type: "video/mp4",
        },
      ],
      title: "Video Three",
      // poster: SampleImage,
    },
    {
      sources: [
        {
          src: "http://media.w3.org/2010/05/video/movie_300.mp4",
          type: "video/mp4",
        },
      ],
      title: "Video Four",
      // poster: SampleImage,
    },
    {
      sources: [
        {
          src: "http://vjs.zencdn.net/v/oceans.mp4",
          type: "video/mp4",
        },
      ],
      title: "Video Five",
      // poster: SampleImage,
    },
    {
      sources: [
        {
          src: "https://firebasestorage.googleapis.com/v0/b/sri-lanka-airlines-storage.appspot.com/o/videojs%2Fsample720p.mp4?alt=media&token=42e44c03-3ddf-4596-bc43-940fd26047fa",
          type: "video/mp4",
        },
      ],
      title: "Video Six",
      // poster: SampleImage,
    },
  ];

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
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
      customPlaylistPopup: {
        playlist: playlist,
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
