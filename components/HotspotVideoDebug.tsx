'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
	hotspots,
	useVideoPlayer,
	VIDEO_CONFIG,
	COMPONENT_STYLES,
	type VideoPlayerRefs,
} from '../lib';
import CustomVideoControls from './CustomVideoControls';

const HotspotVideoDebug = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const video2Ref = useRef<HTMLVideoElement>(null);
	const hotspotRef = useRef<HTMLDivElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);
	const labelRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLDivElement>(null);
	const fullscreenToggleRef = useRef<HTMLButtonElement>(null);
	const [currentHotspotIdx, setCurrentHotspotIdx] = useState(-1);
	const [currentTime, setCurrentTime] = useState(0);

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

	// Debug: track current time
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const updateTime = () => setCurrentTime(video.currentTime);
		video.addEventListener('timeupdate', updateTime);
		return () => video.removeEventListener('timeupdate', updateTime);
	}, []);

	// Debug function to jump to hotspot times
	const jumpToHotspot = (hotspotIndex: number) => {
		const video = videoRef.current;
		if (video && hotspots[hotspotIndex]) {
			video.currentTime = hotspots[hotspotIndex].startTime + 1;
		}
	};

	return (
		<div className={COMPONENT_STYLES.container} id={VIDEO_CONFIG.containerId}>
			{/* Debug Controls */}
			<div className="mb-4 p-4 bg-gray-800 rounded">
				<h3 className="text-white text-lg mb-2">Debug Controls</h3>
				<p className="text-white text-sm mb-2">
					Current time: {Math.floor(currentTime)}s
				</p>
				<p className="text-white text-sm mb-2">
					Current hotspot:{' '}
					{currentHotspotIdx >= 0 ? hotspots[currentHotspotIdx].title : 'None'}
				</p>
				<div className="flex gap-2 flex-wrap">
					{hotspots.slice(0, 3).map((hotspot, index) => (
						<button
							key={index}
							onClick={() => jumpToHotspot(index)}
							className="px-2 py-1 bg-pink-500 hover:bg-pink-600 text-white text-xs rounded"
						>
							Jump to {hotspot.startTime}s
						</button>
					))}
				</div>
			</div>

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
				<video
					ref={video2Ref}
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
				<video
					ref={videoRef}
					playsInline
					preload="metadata"
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
				<CustomVideoControls videoRef={videoRef} />
			</div>
			<div ref={descriptionRef} className={COMPONENT_STYLES.description} />
		</div>
	);
};

export default HotspotVideoDebug;
