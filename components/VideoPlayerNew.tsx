'use client';

import React, { useEffect, useRef, useState } from 'react';

const hotspots = [
	{
		startTime: 2,
		endTime: 12,
		//top: 60,
		//left: 295,
		//height: 180,
		//width: 140,
		title: 'Attachment Troubleshooting',
		text: '1. First video overlay "Attachment Troubleshooting" - 10 second duration.',
		link: '/video2a.mp4',
	},
	{
		startTime: 14,
		endTime: 24,
		//top: 110,
		//left: 155,
		//height: 90,
		//width: 140,
		title: 'Red Light Troubleshooting',
		text: '2. Second video overlay "Red Light Troubleshooting" - 10 second duration.',
		link: '/video2b.mp4',
	},
	{
		startTime: 26,
		endTime: 36,
		//top: 135,
		//left: 35,
		//height: 70,
		//width: 130,
		title: 'Sleep Troubleshooting',
		text: '3. Third video overlay "Sleep Troubleshooting" - 10 second duration.',
		link: '/video3a.mp4',
	},
];

const HotspotVideo = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const video2Ref = useRef<HTMLVideoElement>(null);
	const hotspotRef = useRef<HTMLDivElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);
	const labelRef = useRef<HTMLDivElement>(null);
	const closeRef = useRef<HTMLDivElement>(null);
	const [currentHotspotIdx, setCurrentHotspotIdx] = useState(-1);

	useEffect(() => {
		const video = videoRef.current;
		const video2 = video2Ref.current;
		const hotspot = hotspotRef.current;
		const label = labelRef.current;
		const close = closeRef.current;
		const description = descriptionRef.current;

		const handleTimeUpdate = () => {
			const currentTime = video?.currentTime || 0;
			let newHotspotIdx = -1;

			for (let i = 0; i < hotspots.length; i++) {
				if (
					currentTime >= hotspots[i].startTime &&
					currentTime < hotspots[i].endTime
				) {
					newHotspotIdx = i;
					break;
				}
			}

			if (newHotspotIdx !== -1 && newHotspotIdx !== currentHotspotIdx) {
				//const h = hotspots[newHotspotIdx];
				if (hotspot) {
					//hotspot.style.top = `${h.top}px`;
					//hotspot.style.left = `${h.left}px`;
					//hotspot.style.width = `${h.width}px`;
					//hotspot.style.height = `${h.height}px`;
					//hotspot.setAttribute('src', `${hotspots[newHotspotIdx].link}`);
					hotspot.style.visibility = 'visible';
				}
				if (label) {
					label.innerHTML = hotspots[newHotspotIdx].title;
				}
				if (description) {
					description.innerHTML = hotspots[newHotspotIdx].text;
				}
				setCurrentHotspotIdx(newHotspotIdx);
			} else if (newHotspotIdx === -1) {
				if (hotspot) {
					hotspot.style.visibility = 'hidden';
				}
				if (label) {
					label.innerHTML = '';
				}
				if (description) {
					description.innerHTML = '';
				}
				setCurrentHotspotIdx(-1);
			}
		};

		const handleMouseOver = () => {
			if (currentHotspotIdx !== -1) {
				if (description) {
					description.innerHTML = hotspots[currentHotspotIdx].text;
				}
				if (label) {
					label.innerHTML = hotspots[currentHotspotIdx].title;
				}
				//video?.pause();
				//video?.setAttribute('src', '/video3.mp4');
				//video?.load();
			}
		};

		const handleMouseOut = () => {
			//description.innerHTML = '';
			//video?.play();
		};

		const handleMouseClick = () => {
			if (currentHotspotIdx >= 0 && currentHotspotIdx < hotspots.length) {
				const hotspot = hotspots[currentHotspotIdx];
				if (close) {
					close.style.visibility = 'visible';
				}
				video?.pause(); // Pause the main video
				if (video2) {
					video2.pause(); // Pause video2 if it's currently playing
					video2.removeAttribute('src'); // Remove the current src to reset the video
					video2.style.visibility = 'hidden'; // Temporarily hide the video to ensure proper reset

					// Ensure the video element is fully reset before setting the new src
					const resetAndPlayVideo2 = () => {
						video2.setAttribute('src', hotspot.link); // Set the new src
						video2.load(); // Ensure the video is loaded before playing
						video2.style.visibility = 'visible'; // Make the video visible again
						video2.play().catch((error) => {
							console.error('Error playing video2:', error);
						});
					};

					// Use a small delay to ensure the video element is fully reset
					setTimeout(resetAndPlayVideo2, 50); // Delay of 50ms to allow the reset to complete
				}
			}
		};

		const handleVideo2Ended = () => {
			if (video2) {
				video2.style.visibility = 'hidden';
				video?.play();
			}
			if (close) {
				close.style.visibility = 'hidden';
			}
		};

		const handleClose = () => {
			if (video2) {
				video2?.pause();
				video2.style.visibility = 'hidden';
				video?.play();
				if (close) {
					close.style.visibility = 'hidden';
				}
			}
		};

		video?.addEventListener('timeupdate', handleTimeUpdate);
		hotspot?.addEventListener('mouseover', handleMouseOver);
		hotspot?.addEventListener('mouseout', handleMouseOut);
		hotspot?.addEventListener('click', handleMouseClick);
		video2?.addEventListener('ended', handleVideo2Ended);
		close?.addEventListener('click', handleClose);

		return () => {
			video?.removeEventListener('timeupdate', handleTimeUpdate);
			hotspot?.removeEventListener('mouseover', handleMouseOver);
			hotspot?.removeEventListener('mouseout', handleMouseOut);
			hotspot?.addEventListener('click', handleMouseClick);
			video2?.removeEventListener('ended', handleVideo2Ended);
			close?.removeEventListener('click', handleClose);
		};
	}, [currentHotspotIdx]);

	return (
		<div className="flex flex-col items-start gap-4">
			<div className="relative w-full max-w-4xl">
				{/** HOTSPOT VIDEO CLOSE BUTTON */}
				<div
					ref={closeRef}
					className="absolute z-30 right-4 top-4 px-2 rounded-full bg-white/50 text-black/50 hover:bg-white/100 hover:text-black/100 border-black/50 hover:border-black/100"
					style={{ visibility: 'hidden' }}
				>
					close
				</div>
				{/* HOTSPOT VIDEO */}
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video
					ref={video2Ref}
					controls
					preload="auto"
					className="absolute w-full max-w-4xl z-20"
					style={{ visibility: 'hidden' }}
				>
					<source src="/video2.mp4" type="video/mp4" />
					<track
						src="/captions/video2.vtt"
						kind="subtitles"
						srcLang="en"
						label="English"
					/>
					<p>HTML5 video is not supported by this browser.</p>
				</video>
				{/* HOTSPOT LABEL */}
				<div
					ref={hotspotRef}
					className="absolute z-10 right-4 bottom-14 px-2 text-green-900 border-2 border-green-400 bg-green-300/60 rounded-full transition-all duration-200 hover:text-black hover:bg-green-300 hover:border-green-500 hover:cursor-pointer"
					style={{ visibility: 'hidden' }}
				>
					<div ref={labelRef} />
				</div>

				{/** BASE VIDEO */}
				{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
				<video ref={videoRef} controls className="w-full max-w-4xl">
					<source src="/video1.mp4" type="video/mp4" />
					<track
						src="/captions/video2.vtt"
						kind="subtitles"
						srcLang="en"
						label="English"
					/>
					<p>HTML5 video is not supported by this browser.</p>
				</video>
			</div>
			<div
				ref={descriptionRef}
				className="w-full max-w-4xl min-h-[50px] border-2 border-gray-600 p-2 text-sm text-white"
			/>
		</div>
	);
};

export default HotspotVideo;
