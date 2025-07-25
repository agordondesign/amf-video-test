'use client';

import React, { useRef } from 'react';
import CustomVideoControls from './CustomVideoControls';

/**
 * Simple example demonstrating how to use CustomVideoControls
 * with any video element
 */
const SimpleVideoExample: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4 text-white">
				Simple Video with Custom Controls
			</h2>
			
			<div className="relative bg-black rounded-lg overflow-hidden">
				{/* Video element - note: no controls prop */}
				<video
					ref={videoRef}
					src="/APST1201 Skytrofa IFU Auto Injector Video.mp4"
					className="w-full h-auto"
					playsInline
					preload="metadata"
				>
					<track
						src="/captions.vtt"
						kind="subtitles"
						srcLang="en"
						label="English"
					/>
					Your browser does not support the video tag.
				</video>

				{/* Custom video controls overlay */}
				<CustomVideoControls 
					videoRef={videoRef}
					skipTime={15} // Custom skip time in seconds
					autoHideDelay={4000} // Custom auto-hide delay in ms
				/>
			</div>

			<div className="mt-4 p-4 bg-gray-800 rounded-lg text-white text-sm">
				<h3 className="font-semibold mb-2">Features:</h3>
				<ul className="list-disc list-inside space-y-1">
					<li>Custom styled play/pause button with smooth transitions</li>
					<li>Interactive progress bar with gradient styling</li>
					<li>Skip forward/backward buttons (configurable time)</li>
					<li>Volume control with hover-to-show slider</li>
					<li>Fullscreen toggle</li>
					<li>Time display (current/total)</li>
					<li>Auto-hiding controls (configurable delay)</li>
					<li>Keyboard and mouse interaction support</li>
				</ul>
			</div>
		</div>
	);
};

export default SimpleVideoExample;
