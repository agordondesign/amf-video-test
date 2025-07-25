'use client';

import React, { useRef } from 'react';
import CustomVideoControls from './CustomVideoControls';

const SimpleVideoTest: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<div className="w-full max-w-2xl mx-auto p-4">
			<h2 className="text-white text-2xl mb-4">Simple Video Test</h2>
			<div className="relative bg-black rounded-lg overflow-hidden">
				<video
					ref={videoRef}
					src="/APST1201 Skytrofa IFU Auto Injector Video.mp4"
					className="w-full"
					playsInline
					preload="metadata"
				>
					Your browser does not support the video tag.
				</video>
				<CustomVideoControls videoRef={videoRef} />
			</div>
			<div className="mt-4 text-white text-sm">
				<p>
					Click the play button to start the video and test the progress bar.
				</p>
			</div>
		</div>
	);
};

export default SimpleVideoTest;
