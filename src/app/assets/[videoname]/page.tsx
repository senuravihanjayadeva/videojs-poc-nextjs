"use client";
import { useSearchParams } from "next/navigation";
import Features from "@/components/Features";
import VideoPlayer from "@/components/VideoPlayer";
import React, { useEffect, useRef, useState } from "react";

let playlist = [
  {
    sources: [
      {
        src: "http://media.w3.org/2010/05/video/movie_300.mp4",
        type: "video/mp4",
        quality: "360p",
      },
    ],
    title: "Video Intial",
    clipId: "1",
  },
  {
    sources: [
      {
        src: "http://techslides.com/demos/sample-videos/small.mp4",
        type: "video/mp4",
        quality: "360p",
      },
    ],
    title: "Video One",
    clipId: "2",
  },
  {
    sources: [
      {
        src: "http://vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
    title: "Video Two",
    clipId: "3",
  },
  {
    sources: [
      {
        src: "http://techslides.com/demos/sample-videos/small.mp4",
        type: "video/mp4",
      },
    ],
    title: "Video Three",
    clipId: "4",
  },
  {
    sources: [
      {
        src: "http://media.w3.org/2010/05/video/movie_300.mp4",
        type: "video/mp4",
      },
    ],
    title: "Video Four",
    clipId: "5",
  },
  {
    sources: [
      {
        src: "http://vjs.zencdn.net/v/oceans.mp4",
        type: "video/mp4",
      },
    ],
    title: "Video Five",
    clipId: "6",
  },
  {
    sources: [
      {
        src: "https://firebasestorage.googleapis.com/v0/b/videos-f6df6.appspot.com/o/sample720.mp4?alt=media&token=e7dde705-9791-4002-abdf-ff87bd7c9e59",
        type: "video/mp4",
      },
    ],
    title: "Video Six",
    clipId: "7",
  },
];

export default function AssetsClipsPage({
  params,
}: {
  params: { videoname: string };
}) {
  const searchParams = useSearchParams();
  const clip = searchParams.get("clip");

  const [videoSource, setVideoSource] = useState(null);

  const playerRef = useRef(null);

  useEffect(() => {
    let selectedVideo =
      playlist &&
      playlist.filter((video) => {
        return video.clipId == clip;
      });

    setVideoSource(selectedVideo[0]?.sources);
  }, [clip]);

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
    sources: videoSource,
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
