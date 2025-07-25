'use client';

import React, { useState, useEffect, useRef } from 'react';
import { VIDEO_CONFIG } from '../lib';

interface CustomVideoControlsProps {
	videoRef: React.RefObject<HTMLVideoElement | null>;
	className?: string;
	skipTime?: number;
	autoHideDelay?: number;
}

const CustomVideoControls: React.FC<CustomVideoControlsProps> = ({
	videoRef,
	className = '',
	skipTime: skipTimeAmount = VIDEO_CONFIG.skipTimeAmount,
	autoHideDelay = VIDEO_CONFIG.controlsAutoHideDelay,
}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const [isDragging, setIsDragging] = useState(false);
	const [isHoveringControls, setIsHoveringControls] = useState(false);
	const [hoverTime, setHoverTime] = useState(0);
	const [showHoverTime, setShowHoverTime] = useState(false);
	const progressRef = useRef<HTMLDivElement>(null);
	const volumeRef = useRef<HTMLDivElement>(null);
	const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const updateTime = () => setCurrentTime(video.currentTime);
		const updateDuration = () => {
			if (video.duration && !isNaN(video.duration)) {
				setDuration(video.duration);
			}
		};
		const updatePlayState = () => setIsPlaying(!video.paused);
		const updateVolume = () => {
			setVolume(video.volume);
			setIsMuted(video.muted);
		};

		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		video.addEventListener('timeupdate', updateTime);
		video.addEventListener('loadedmetadata', updateDuration);
		video.addEventListener('loadeddata', updateDuration); // Also listen for loadeddata
		video.addEventListener('canplay', updateDuration); // And canplay
		video.addEventListener('play', updatePlayState);
		video.addEventListener('pause', updatePlayState);
		video.addEventListener('volumechange', updateVolume);
		document.addEventListener('fullscreenchange', handleFullscreenChange);

		// Check if video already has metadata loaded
		if (video.duration && !isNaN(video.duration)) {
			setDuration(video.duration);
		}
		if (video.currentTime) {
			setCurrentTime(video.currentTime);
		}

		// Ensure video starts loading
		if (video.readyState === 0) {
			video.load();
		}

		return () => {
			video.removeEventListener('timeupdate', updateTime);
			video.removeEventListener('loadedmetadata', updateDuration);
			video.removeEventListener('loadeddata', updateDuration);
			video.removeEventListener('canplay', updateDuration);
			video.removeEventListener('play', updatePlayState);
			video.removeEventListener('pause', updatePlayState);
			video.removeEventListener('volumechange', updateVolume);
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		};
	}, [videoRef]);

	// Auto-hide controls with mouse detection
	useEffect(() => {
		const resetControlsTimer = () => {
			if (controlsTimeoutRef.current) {
				clearTimeout(controlsTimeoutRef.current);
			}
			setShowControls(true);

			// Only auto-hide if playing, not dragging, and not hovering controls
			if (isPlaying && !isDragging && !isHoveringControls) {
				controlsTimeoutRef.current = setTimeout(() => {
					setShowControls(false);
				}, autoHideDelay);
			}
		};

		resetControlsTimer();

		return () => {
			if (controlsTimeoutRef.current) {
				clearTimeout(controlsTimeoutRef.current);
			}
		};
	}, [isPlaying, isDragging, isHoveringControls, autoHideDelay]);

	const togglePlay = () => {
		const video = videoRef.current;
		if (!video) return;

		if (video.paused) {
			video.play().catch((error) => {
				console.error('Error playing video:', error);
			});
		} else {
			video.pause();
		}
	};

	// Mouse event handlers for container
	const handleMouseEnter = () => {
		setShowControls(true);
		if (controlsTimeoutRef.current) {
			clearTimeout(controlsTimeoutRef.current);
		}
	};

	const handleMouseLeave = () => {
		if (isPlaying && !isDragging) {
			controlsTimeoutRef.current = setTimeout(() => {
				setShowControls(false);
			}, autoHideDelay);
		}
	};

	const handleMouseMove = () => {
		setShowControls(true);
		if (controlsTimeoutRef.current) {
			clearTimeout(controlsTimeoutRef.current);
		}

		if (isPlaying && !isDragging) {
			controlsTimeoutRef.current = setTimeout(() => {
				setShowControls(false);
			}, autoHideDelay);
		}
	};

	// Controls hover handlers
	const handleControlsMouseEnter = () => {
		setIsHoveringControls(true);
		setShowControls(true);
	};

	const handleControlsMouseLeave = () => {
		setIsHoveringControls(false);
	};

	const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const video = videoRef.current;
		const progressBar = progressRef.current;
		if (!video || !progressBar) return;

		const rect = progressBar.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const newTime = (clickX / rect.width) * duration;
		video.currentTime = newTime;
	};

	// Draggable progress bar functionality
	const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		handleProgressClick(e);
	};

	const handleProgressMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const progressBar = progressRef.current;
		if (!progressBar) return;

		const rect = progressBar.getBoundingClientRect();
		const hoverX = e.clientX - rect.left;
		const hoverTimeValue = (hoverX / rect.width) * duration;
		setHoverTime(Math.max(0, Math.min(duration, hoverTimeValue)));
	};

	const handleProgressMouseEnter = () => {
		setShowHoverTime(true);
	};

	const handleProgressMouseLeave = () => {
		setShowHoverTime(false);
	};

	// Add global mouse event listeners for dragging
	useEffect(() => {
		const handleMove = (e: MouseEvent) => {
			if (!isDragging) return;

			const video = videoRef.current;
			const progressBar = progressRef.current;
			if (!video || !progressBar) return;

			const rect = progressBar.getBoundingClientRect();
			const clickX = e.clientX - rect.left;
			const newTime = Math.max(
				0,
				Math.min(duration, (clickX / rect.width) * duration)
			);
			video.currentTime = newTime;
		};

		const handleUp = () => {
			setIsDragging(false);
		};

		if (isDragging) {
			document.addEventListener('mousemove', handleMove);
			document.addEventListener('mouseup', handleUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleMove);
			document.removeEventListener('mouseup', handleUp);
		};
	}, [isDragging, duration, videoRef]);

	const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const video = videoRef.current;
		const volumeBar = volumeRef.current;
		if (!video || !volumeBar) return;

		const rect = volumeBar.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
		video.volume = newVolume;
		video.muted = newVolume === 0;
	};

	// Volume dragging functionality
	const [isDraggingVolume, setIsDraggingVolume] = useState(false);

	const handleVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDraggingVolume(true);
		handleVolumeClick(e);
	};

	useEffect(() => {
		const handleVolumeMove = (e: MouseEvent) => {
			if (!isDraggingVolume) return;

			const video = videoRef.current;
			const volumeBar = volumeRef.current;
			if (!video || !volumeBar) return;

			const rect = volumeBar.getBoundingClientRect();
			const clickX = e.clientX - rect.left;
			const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
			video.volume = newVolume;
			video.muted = newVolume === 0;
		};

		const handleVolumeUp = () => {
			setIsDraggingVolume(false);
		};

		if (isDraggingVolume) {
			document.addEventListener('mousemove', handleVolumeMove);
			document.addEventListener('mouseup', handleVolumeUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleVolumeMove);
			document.removeEventListener('mouseup', handleVolumeUp);
		};
	}, [isDraggingVolume, videoRef]);

	const toggleMute = () => {
		const video = videoRef.current;
		if (!video) return;

		video.muted = !video.muted;
	};

	const toggleFullscreen = async () => {
		const video = videoRef.current;
		if (!video) return;

		try {
			if (!document.fullscreenElement) {
				await video.requestFullscreen();
			} else {
				await document.exitFullscreen();
			}
		} catch (error) {
			console.error('Fullscreen error:', error);
		}
	};

	const skipTime = (seconds: number) => {
		const video = videoRef.current;
		if (!video) return;

		video.currentTime = Math.max(
			0,
			Math.min(duration, video.currentTime + seconds)
		);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
	const volumePercentage = volume * 100;

	return (
		<div
			ref={containerRef}
			className={`absolute bottom-0 left-0 right-0 z-30 transition-opacity duration-300 ${
				showControls ? 'opacity-100' : 'opacity-0'
			} ${className} ${isDragging || isDraggingVolume ? 'select-none' : ''}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}
		>
			{/* Background gradient */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

			{/* Controls container */}
			<div
				className="relative p-4 flex flex-col gap-3"
				onMouseEnter={handleControlsMouseEnter}
				onMouseLeave={handleControlsMouseLeave}
			>
				{/* Progress bar */}
				<div
					ref={progressRef}
					className="group cursor-pointer relative"
					onClick={handleProgressClick}
					onMouseDown={handleProgressMouseDown}
					onMouseMove={handleProgressMouseMove}
					onMouseEnter={handleProgressMouseEnter}
					onMouseLeave={handleProgressMouseLeave}
				>
					{/* Hover time tooltip */}
					{showHoverTime && (
						<div
							className="absolute bottom-8 left-0 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded pointer-events-none z-10"
							style={{
								left: `${Math.max(
									0,
									Math.min(100, (hoverTime / duration) * 100)
								)}%`,
							}}
						>
							{formatTime(hoverTime)}
						</div>
					)}

					<div
						className={`h-1 bg-white/30 rounded-full relative overflow-hidden group-hover:h-2 transition-all duration-200 ${
							isDragging ? 'h-2' : ''
						}`}
					>
						<div
							className="h-full bg-gradient-to-r from-pink-500 to-lime-500 rounded-full transition-all duration-100"
							style={{ width: `${progressPercentage}%` }}
						/>
						{/* Progress thumb */}
						<div
							className={`absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 transition-opacity duration-200 ${
								isDragging
									? 'opacity-100 scale-110'
									: 'opacity-0 group-hover:opacity-100'
							}`}
							style={{ left: `${progressPercentage}%` }}
						/>
					</div>
				</div>

				{/* Main controls */}
				<div className="flex items-center justify-between">
					{/* Left controls */}
					<div className="flex items-center gap-4">
						{/* Play/Pause */}
						<button
							onClick={togglePlay}
							className="text-white hover:text-lime-400 transition-colors duration-200 p-1"
							aria-label={isPlaying ? 'Pause' : 'Play'}
						>
							{isPlaying ? (
								<svg
									className="w-8 h-8"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
								</svg>
							) : (
								<svg
									className="w-8 h-8"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M8 5v14l11-7z" />
								</svg>
							)}
						</button>

						{/* Skip backward */}
						<button
							onClick={() => skipTime(-skipTimeAmount)}
							className="text-white hover:text-lime-400 transition-colors duration-200 p-1"
							aria-label={`Skip backward ${skipTimeAmount} seconds`}
						>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
								<text
									x="12"
									y="15"
									fontSize="8"
									textAnchor="middle"
									fill="currentColor"
								>
									{skipTimeAmount}
								</text>
							</svg>
						</button>

						{/* Skip forward */}
						<button
							onClick={() => skipTime(skipTimeAmount)}
							className="text-white hover:text-lime-400 transition-colors duration-200 p-1"
							aria-label={`Skip forward ${skipTimeAmount} seconds`}
						>
							<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z" />
								<text
									x="12"
									y="15"
									fontSize="8"
									textAnchor="middle"
									fill="currentColor"
								>
									{skipTimeAmount}
								</text>
							</svg>
						</button>

						{/* Volume control */}
						<div className="flex items-center gap-2 group">
							<button
								onClick={toggleMute}
								className="text-white hover:text-lime-400 transition-colors duration-200 p-1"
								aria-label={isMuted ? 'Unmute' : 'Mute'}
							>
								{isMuted || volume === 0 ? (
									<svg
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
									</svg>
								) : volume < 0.5 ? (
									<svg
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
									</svg>
								) : (
									<svg
										className="w-6 h-6"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
									</svg>
								)}
							</button>

							{/* Volume slider */}
							<div
								ref={volumeRef}
								className={`w-20 h-1 bg-white/30 rounded-full cursor-pointer relative overflow-hidden transition-opacity duration-200 ${
									isDraggingVolume
										? 'opacity-100'
										: 'opacity-0 group-hover:opacity-100'
								}`}
								onClick={handleVolumeClick}
								onMouseDown={handleVolumeMouseDown}
							>
								<div
									className="h-full bg-gradient-to-r from-pink-500 to-lime-500 rounded-full"
									style={{ width: `${volumePercentage}%` }}
								/>
								{/* Volume thumb */}
								<div
									className={`absolute top-1/2 w-2 h-2 bg-white rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 transition-opacity duration-200 ${
										isDraggingVolume ? 'opacity-100' : 'opacity-0'
									}`}
									style={{ left: `${volumePercentage}%` }}
								/>
							</div>
						</div>

						{/* Time display */}
						<div className="text-white text-sm font-mono">
							{formatTime(currentTime)} / {formatTime(duration)}
						</div>

						{/* Debug info - remove this later */}
						<div className="text-white text-xs opacity-70">
							{duration === 0
								? 'Loading...'
								: `${Math.round(progressPercentage)}%`}
						</div>
					</div>

					{/* Right controls */}
					<div className="flex items-center gap-4">
						{/* Fullscreen */}
						<button
							onClick={toggleFullscreen}
							className="text-white hover:text-lime-400 transition-colors duration-200 p-1"
							aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
						>
							{isFullscreen ? (
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
								</svg>
							) : (
								<svg
									className="w-6 h-6"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CustomVideoControls;
