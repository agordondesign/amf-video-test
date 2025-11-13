'use client';

import React, { useRef } from 'react';
import CustomVideoControls from './CustomVideoControls';
import { VIDEO_CONFIG } from '../lib';

/**
 * Demo component showcasing the enhanced custom video controls
 * Features demonstrated:
 * - Draggable progress bar with time preview
 * - Auto-hiding controls on mouse out
 * - Show controls on mouse in
 * - Draggable volume control
 * - Custom skip times
 * - Fullscreen support
 */
const VideoControlsDemo: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<div className="w-full max-w-4xl mx-auto">
			<h2 className="text-2xl font-bold text-white mb-4">
				Enhanced Video Controls Demo
			</h2>

			{/* Demo Features List */}
			<div className="bg-gray-800 p-4 rounded-lg mb-4 text-white">
				<h3 className="text-lg font-semibold mb-2">Features:</h3>
				<ul className="list-disc list-inside space-y-1 text-sm">
					<li>
						🎯 <strong>Draggable Progress Bar:</strong> Click and drag to scrub
						through video
					</li>
					<li>
						⏰ <strong>Time Preview:</strong> Hover over progress bar to see
						time tooltip
					</li>
					<li>
						👻 <strong>Auto-hide Controls:</strong> Controls fade out after 3
						seconds of inactivity
					</li>
					<li>
						🖱️ <strong>Mouse Detection:</strong> Controls show on mouse enter,
						hide on mouse leave
					</li>
					<li>
						🔊 <strong>Draggable Volume:</strong> Click and drag volume slider
					</li>
					<li>
						⏭️ <strong>Custom Skip:</strong> 10-second forward/backward buttons
					</li>
					<li>
						🔳 <strong>Fullscreen:</strong> Native fullscreen support
					</li>
					<li>
						🎨 <strong>Smooth Animations:</strong> Gradient progress bars and
						hover effects
					</li>
				</ul>
			</div>

			{/* Video Player with Enhanced Controls */}
			<div className="relative bg-black rounded-lg overflow-hidden">
				<video
					ref={videoRef}
					src={VIDEO_CONFIG.mainVideo}
					className="w-full aspect-video"
					playsInline
				>
					<track
						src={VIDEO_CONFIG.captionsPath}
						kind="subtitles"
						srcLang={VIDEO_CONFIG.captionsLanguage}
						label={VIDEO_CONFIG.captionsLabel}
					/>
					Your browser does not support the video tag.
				</video>

				{/* Enhanced Custom Controls */}
				<CustomVideoControls
					videoRef={videoRef}
					skipTime={VIDEO_CONFIG.skipTimeAmount}
					autoHideDelay={VIDEO_CONFIG.controlsAutoHideDelay}
				/>
			</div>

			{/* Usage Instructions */}
			<div className="bg-gray-800 p-4 rounded-lg mt-4 text-white">
				<h3 className="text-lg font-semibold mb-2">Try These Interactions:</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
					<div>
						<h4 className="font-medium text-lime-400 mb-1">Progress Bar:</h4>
						<ul className="list-disc list-inside space-y-1">
							<li>Click anywhere to jump to that time</li>
							<li>Drag the progress thumb to scrub</li>
							<li>Hover to see time preview tooltip</li>
						</ul>
					</div>
					<div>
						<h4 className="font-medium text-pink-400 mb-1">
							Controls Behavior:
						</h4>
						<ul className="list-disc list-inside space-y-1">
							<li>Move mouse away to auto-hide controls</li>
							<li>Move mouse back to show controls</li>
							<li>Hover over controls to keep them visible</li>
						</ul>
					</div>
					<div>
						<h4 className="font-medium text-lime-400 mb-1">Volume Control:</h4>
						<ul className="list-disc list-inside space-y-1">
							<li>Hover over volume icon to show slider</li>
							<li>Click or drag volume slider</li>
							<li>Click volume icon to mute/unmute</li>
						</ul>
					</div>
					<div>
						<h4 className="font-medium text-pink-400 mb-1">Playback:</h4>
						<ul className="list-disc list-inside space-y-1">
							<li>Spacebar or click play button</li>
							<li>Skip ±10 seconds with arrow buttons</li>
							<li>Enter fullscreen mode</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoControlsDemo;
