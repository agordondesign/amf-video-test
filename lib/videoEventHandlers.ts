import type { Hotspot, VideoPlayerRefs } from './types';
import { VIDEO_CONFIG } from './config';

export const createVideoEventHandlers = (
	refs: VideoPlayerRefs,
	hotspots: Hotspot[],
	currentHotspotIdx: number,
	setCurrentHotspotIdx: (idx: number) => void
) => {
	const {
		videoRef,
		video2Ref,
		hotspotRef,
		labelRef,
		closeRef,
		descriptionRef,
	} = refs;

	const handleTimeUpdate = () => {
		const video = videoRef.current;
		const hotspot = hotspotRef.current;
		const label = labelRef.current;
		const description = descriptionRef.current;

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
			if (hotspot) {
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
		const description = descriptionRef.current;
		const label = labelRef.current;

		if (currentHotspotIdx !== -1) {
			if (description) {
				description.innerHTML = hotspots[currentHotspotIdx].text;
			}
			if (label) {
				label.innerHTML = hotspots[currentHotspotIdx].title;
			}
		}
	};

	const handleMouseOut = () => {
		// Currently no operation on mouse out
	};

	const handleMouseClick = () => {
		const video = videoRef.current;
		const video2 = video2Ref.current;
		const close = closeRef.current;

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
				}; // Use a small delay to ensure the video element is fully reset
				setTimeout(resetAndPlayVideo2, VIDEO_CONFIG.resetDelay);
			}
		}
	};

	const handleVideo2Ended = () => {
		const video = videoRef.current;
		const video2 = video2Ref.current;
		const close = closeRef.current;

		if (video2) {
			video2.style.visibility = 'hidden';
			video?.play();
		}
		if (close) {
			close.style.visibility = 'hidden';
		}
	};

	const handleClose = () => {
		const video = videoRef.current;
		const video2 = video2Ref.current;
		const close = closeRef.current;

		if (video2) {
			video2?.pause();
			video2.style.visibility = 'hidden';
			video?.play();
			if (close) {
				close.style.visibility = 'hidden';
			}
		}
	};

	return {
		handleTimeUpdate,
		handleMouseOver,
		handleMouseOut,
		handleMouseClick,
		handleVideo2Ended,
		handleClose,
	};
};
