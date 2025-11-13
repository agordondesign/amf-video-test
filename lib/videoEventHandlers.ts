import type { Hotspot, VideoPlayerRefs } from './types';
import { VIDEO_CONFIG } from './config';

export const createVideoEventHandlers = (
	refs: VideoPlayerRefs,
	hotspots: Hotspot[],
	currentHotspotIdx: number,
	setCurrentHotspotIdx: (idx: number) => void,
	setIsOverlayVisible?: (visible: boolean) => void
) => {
	const {
		videoRef,
		video2Ref,
		hotspotRef,
		labelRef,
		closeRef,
		descriptionRef,
	} = refs;

	// Volume fade-in function for smooth audio transition
	const fadeInVolume = (video: HTMLVideoElement, duration: number = 1000) => {
		const originalVolume = video.volume;
		video.volume = 0;
		const startTime = Date.now();

		const fade = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);
			video.volume = originalVolume * progress;

			if (progress < 1) {
				requestAnimationFrame(fade);
			}
		};

		requestAnimationFrame(fade);
	};

	// Fade-in function for hotspot buttons
	const fadeInHotspot = (element: HTMLElement, duration: number = 500) => {
		element.style.opacity = '0';
		element.style.visibility = 'visible';
		element.style.transition = `opacity ${duration}ms ease-out`;

		// Force a reflow to ensure the transition is applied
		void element.offsetHeight;

		element.style.opacity = '1';
	};

	// Fade-out function for hotspot buttons
	const fadeOutHotspot = (element: HTMLElement, duration: number = 300) => {
		element.style.transition = `opacity ${duration}ms ease-out`;
		element.style.opacity = '0';

		setTimeout(() => {
			element.style.visibility = 'hidden';
		}, duration);
	};

	const handleTimeUpdate = () => {
		const video = videoRef.current;
		const hotspot = hotspotRef.current;
		const label = labelRef.current;
		const description = descriptionRef.current;
		const video2 = video2Ref.current;

		// If overlay video is visible, hide hotspots
		const overlayIsVisible = video2?.style.visibility === 'visible';

		const currentTime = video?.currentTime || 0;
		let newHotspotIdx = -1;

		// Only show hotspots if overlay is not visible
		if (!overlayIsVisible) {
			for (let i = 0; i < hotspots.length; i++) {
				if (
					currentTime >= hotspots[i].startTime &&
					currentTime < hotspots[i].endTime
				) {
					newHotspotIdx = i;
					break;
				}
			}
		}

		// Debug logging
		if (currentTime > 4 && currentTime < 16) {
			console.log(
				'Video time:',
				currentTime,
				'Hotspot index:',
				newHotspotIdx,
				'Overlay visible:',
				overlayIsVisible
			);
		}

		if (
			newHotspotIdx !== -1 &&
			newHotspotIdx !== currentHotspotIdx &&
			!overlayIsVisible
		) {
			console.log('Showing hotspot:', newHotspotIdx);
			if (hotspot) {
				fadeInHotspot(hotspot);
			}
			if (label) {
				label.innerHTML = hotspots[newHotspotIdx].title;
			}
			if (description) {
				description.innerHTML = hotspots[newHotspotIdx].text;
			}
			setCurrentHotspotIdx(newHotspotIdx);
		} else if (newHotspotIdx === -1 || overlayIsVisible) {
			if (hotspot && hotspot.style.visibility === 'visible') {
				fadeOutHotspot(hotspot);
			}
			if (label) {
				label.innerHTML = '';
			}
			if (description) {
				description.innerHTML = '';
			}
			if (!overlayIsVisible) {
				setCurrentHotspotIdx(-1);
			}
		}

		// Notify about overlay visibility
		if (setIsOverlayVisible) {
			setIsOverlayVisible(overlayIsVisible);
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

		console.log('Hotspot clicked! Current hotspot index:', currentHotspotIdx);
		console.log('Video elements:', { video, video2, close });
		console.log('Video2 current state:', {
			src: video2?.src,
			currentTime: video2?.currentTime,
			readyState: video2?.readyState,
			paused: video2?.paused,
			visibility: video2?.style.visibility,
		});

		if (currentHotspotIdx >= 0 && currentHotspotIdx < hotspots.length) {
			const hotspot = hotspots[currentHotspotIdx];
			console.log('Playing hotspot video:', hotspot.link);

			if (close) {
				close.style.visibility = 'visible';
			}
			video?.pause(); // Pause the main video
			console.log('Main video paused');

			if (video2) {
				video2.pause(); // Pause video2 if it's currently playing
				video2.removeAttribute('src'); // Remove the current src to reset the video
				video2.style.visibility = 'hidden'; // Temporarily hide the video to ensure proper reset
				console.log('Video2 reset and hidden');

				// Ensure the video element is fully reset before setting the new src
				const resetAndPlayVideo2 = () => {
					console.log('Setting video2 src to:', hotspot.link);
					video2.setAttribute('src', hotspot.link); // Set the new src
					video2.load(); // Ensure the video is loaded before playing
					video2.style.visibility = 'visible'; // Make the video visible again
					console.log('Video2 made visible, attempting to play...');

					// Add event listener for when video can play
					const onCanPlay = () => {
						console.log('Video2 can play - starting playback');
						video2.removeEventListener('canplay', onCanPlay);
						video2
							.play()
							.then(() => {
								console.log('Video2 playback started successfully');
							})
							.catch((error) => {
								console.error('Error playing video2:', error);
							});
					};

					video2.addEventListener('canplay', onCanPlay);

					// Notify about overlay visibility
					if (setIsOverlayVisible) {
						setIsOverlayVisible(true);
					}
				}; // Use a small delay to ensure the video element is fully reset
				setTimeout(resetAndPlayVideo2, VIDEO_CONFIG.resetDelay);
			}
		} else {
			console.log('No valid hotspot index or hotspot not found');
		}
	};

	const handleVideo2Ended = () => {
		const video = videoRef.current;
		const video2 = video2Ref.current;
		const close = closeRef.current;

		if (video2) {
			video2.style.visibility = 'hidden';
		}
		if (close) {
			close.style.visibility = 'hidden';
		}

		// Resume main video with fade-in effect
		if (video) {
			video.play();
			fadeInVolume(video, 1000); // 1 second fade-in
		}

		// Notify about overlay visibility
		if (setIsOverlayVisible) {
			setIsOverlayVisible(false);
		}
	};

	const handleClose = () => {
		const video = videoRef.current;
		const video2 = video2Ref.current;
		const close = closeRef.current;

		if (video2) {
			video2?.pause();
			video2.style.visibility = 'hidden';
			if (close) {
				close.style.visibility = 'hidden';
			}
		}

		// Resume main video with fade-in effect
		if (video) {
			video.play();
			fadeInVolume(video, 1000); // 1 second fade-in
		}

		// Notify about overlay visibility
		if (setIsOverlayVisible) {
			setIsOverlayVisible(false);
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
