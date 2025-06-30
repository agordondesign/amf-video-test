'use client';

import React, { useRef, useState } from 'react';
import {
	hotspots,
	useVideoPlayer,
	VIDEO_CONFIG,
	COMPONENT_STYLES,
	type VideoPlayerRefs,
} from '../lib';

const HotspotVideo = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const video2Ref = useRef<HTMLVideoElement>(null);
	const hotspotRef = useRef<HTMLDivElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);
	const labelRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLDivElement>(null);
	const fullscreenToggleRef = useRef<HTMLButtonElement>(null);
	const [currentHotspotIdx, setCurrentHotspotIdx] = useState(-1);

	const refs: VideoPlayerRefs = {
		videoRef,
		video2Ref,
		hotspotRef,
		descriptionRef,
		labelRef,
		closeRef,
		fullscreenToggleRef,
	};

	useVideoPlayer(refs, hotspots, currentHotspotIdx, setCurrentHotspotIdx);

	return (
		<div className={COMPONENT_STYLES.container} id={VIDEO_CONFIG.containerId}>
			<div
				id={VIDEO_CONFIG.subContainerId}
				className={COMPONENT_STYLES.subContainer}
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
					style={{ visibility: 'hidden' }}
				>
					close
				</div>
				{/* HOTSPOT VIDEO */}
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video
					ref={video2Ref}
					controls
					playsInline
					preload="auto"
					className={COMPONENT_STYLES.overlayVideo}
					style={{ visibility: 'hidden' }}
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
					style={{ visibility: 'hidden' }}
				>
					<div ref={labelRef} />
				</div>

				{/** BASE VIDEO */}
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video
					ref={videoRef}
					controls
					playsInline
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
			</div>
			<div ref={descriptionRef} className={COMPONENT_STYLES.description} />
		</div>
	);
};

export default HotspotVideo;
