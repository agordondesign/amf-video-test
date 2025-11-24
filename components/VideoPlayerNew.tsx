"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import CustomVideoControls from "./CustomVideoControls";
import {
  hotspots,
  useVideoPlayer,
  VIDEO_CONFIG,
  COMPONENT_STYLES,
  type VideoPlayerRefs,
} from "../lib";

const HotspotVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const hotspotRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const fullscreenToggleRef = useRef<HTMLButtonElement>(null);
  const [currentHotspotIdx, setCurrentHotspotIdx] = useState(-1);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const refs: VideoPlayerRefs = {
    videoRef,
    video2Ref,
    hotspotRef,
    descriptionRef,
    labelRef,
    closeRef,
    fullscreenToggleRef,
  };

  useVideoPlayer(
    refs,
    hotspots,
    currentHotspotIdx,
    setCurrentHotspotIdx,
    setIsOverlayVisible
  );

  return (
    <div className={COMPONENT_STYLES.container} id={VIDEO_CONFIG.containerId}>
      {/* Preload all hotspot videos for seamless playback */}
      {hotspots.map((hotspot, index) => (
        <video
          key={`preload-${index}`}
          preload="auto"
          style={{ display: "none" }}
          muted
          playsInline
          crossOrigin="anonymous"
        >
          <source src={hotspot.link} type="video/mp4" />
        </video>
      ))}

      <div
        id={VIDEO_CONFIG.subContainerId}
        className={`${COMPONENT_STYLES.subContainer} ${COMPONENT_STYLES.videoControlsContainer}`}
      >
        {/** FULLSCREEN TOGGLE BUTTON */}
        <div className="pointer-events-auto z-50 hidden">
          <button
            ref={fullscreenToggleRef}
            id="fullscreen-toggle-btn"
            type="button"
            className={COMPONENT_STYLES.fullscreenButton}
          >
            Fullscreen
          </button>
        </div>
        {/** HOTSPOT VIDEO CLOSE BUTTON */}
        <div
          ref={closeRef}
          className={COMPONENT_STYLES.closeButton}
          style={{ visibility: "hidden" }}
        >
          close
        </div>
        {/* HOTSPOT VIDEO */}
        {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
        <video
          ref={video2Ref}
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className={COMPONENT_STYLES.overlayVideo}
          style={{ visibility: "hidden" }}
        >
          <source src={VIDEO_CONFIG.overlayVideo} type="video/mp4" />
          <track
            src={VIDEO_CONFIG.captionsPath}
            kind="subtitles"
            srcLang={VIDEO_CONFIG.captionsLanguage}
            label={VIDEO_CONFIG.captionsLabel}
          />
          <p>HTML5 video is not supported by this browser.</p>
        </video>
        {/* HOTSPOT LABEL */}
        <div
          ref={hotspotRef}
          className={COMPONENT_STYLES.hotspotLabel}
          style={{ visibility: "hidden", opacity: 0 }}
        >
          {/* Use the HelpfulHintsButton SVG */}
          <Image
            src="/HelpfulHintsButton.svg"
            alt="Helpful Hints"
            width={112}
            height={112}
            className="w-18 h-18 max-w-[74px] max-h-[74px] sm:w-24 sm:h-24 sm:max-w-[99px] sm:max-h-[99px] md:w-28 md:h-28 md:max-w-none md:max-h-none"
          />
        </div>

        {/** BASE VIDEO */}
        {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
        <video
          ref={videoRef}
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className={COMPONENT_STYLES.mainVideo}
        >
          <source src={VIDEO_CONFIG.mainVideo} type="video/mp4" />
          <track
            src={VIDEO_CONFIG.captionsPath}
            kind="subtitles"
            srcLang={VIDEO_CONFIG.captionsLanguage}
            label={VIDEO_CONFIG.captionsLabel}
          />
          <p>HTML5 video is not supported by this browser.</p>
        </video>

        {/* Custom Video Controls */}
        <CustomVideoControls
          videoRef={videoRef}
          overlayVideoRef={video2Ref}
          isOverlayVisible={isOverlayVisible}
          skipTime={VIDEO_CONFIG.skipTimeAmount}
          autoHideDelay={VIDEO_CONFIG.controlsAutoHideDelay}
        />
      </div>
      <div ref={descriptionRef} className={COMPONENT_STYLES.description} />
    </div>
  );
};

export default HotspotVideo;
