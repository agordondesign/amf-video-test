'use client';
import React from 'react';
import { useEffect, useRef, useState } from 'react';

const videoUrls = ['video1.mp4', 'video2.mp4', 'video3.mp4'];

export default function VideoPlayer() {
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const videoRefs = useRef<React.RefObject<HTMLVideoElement | null>[]>([]);

	// Initialize refs once
	useEffect(() => {
		videoRefs.current = videoUrls.map(
			(_, i) => videoRefs.current[i] ?? React.createRef()
		);
	}, []);

	useEffect(() => {
		const currentRef = videoRefs.current[currentVideoIndex]?.current;

		if (!currentRef) return;

		const handleEnded = () => {
			const nextIndex = (currentVideoIndex + 1) % videoUrls.length;
			setCurrentVideoIndex(nextIndex);
		};

		currentRef.addEventListener('ended', handleEnded);

		return () => {
			currentRef.removeEventListener('ended', handleEnded);
		};
	}, [currentVideoIndex]);

	return (
		<div className="flex items-center max-w-[768px] w-full">
			{videoUrls.map((url, index) => (
				<video
					key={url}
					ref={videoRefs.current[index]}
					src={url}
					autoPlay={index === currentVideoIndex}
					muted
					playsInline
					style={{
						display: index === currentVideoIndex ? 'block' : 'none',
						width: '100%', // Optional: responsive width
					}}
				/>
			))}
		</div>
	);
}
