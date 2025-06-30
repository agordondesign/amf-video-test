import { useEffect } from 'react';
import type { Hotspot, VideoPlayerRefs } from './types';
import { createVideoEventHandlers } from './videoEventHandlers';
import { toggleFullScreen } from './fullscreen';

export const useVideoPlayer = (
	refs: VideoPlayerRefs,
	hotspots: Hotspot[],
	currentHotspotIdx: number,
	setCurrentHotspotIdx: (idx: number) => void
) => {
	useEffect(() => {
		const { videoRef, video2Ref, hotspotRef, closeRef, fullscreenToggleRef } =
			refs;

		const video = videoRef.current;
		const video2 = video2Ref.current;
		const hotspot = hotspotRef.current;
		const close = closeRef.current;
		const fullscreenToggle = fullscreenToggleRef.current;

		const eventHandlers = createVideoEventHandlers(
			refs,
			hotspots,
			currentHotspotIdx,
			setCurrentHotspotIdx
		);

		// Add event listeners
		video?.addEventListener('timeupdate', eventHandlers.handleTimeUpdate);
		hotspot?.addEventListener('mouseover', eventHandlers.handleMouseOver);
		hotspot?.addEventListener('mouseout', eventHandlers.handleMouseOut);
		hotspot?.addEventListener('click', eventHandlers.handleMouseClick);
		video2?.addEventListener('ended', eventHandlers.handleVideo2Ended);
		close?.addEventListener('click', eventHandlers.handleClose);
		fullscreenToggle?.addEventListener('click', toggleFullScreen);

		// Cleanup function
		return () => {
			video?.removeEventListener('timeupdate', eventHandlers.handleTimeUpdate);
			hotspot?.removeEventListener('mouseover', eventHandlers.handleMouseOver);
			hotspot?.removeEventListener('mouseout', eventHandlers.handleMouseOut);
			hotspot?.removeEventListener('click', eventHandlers.handleMouseClick);
			video2?.removeEventListener('ended', eventHandlers.handleVideo2Ended);
			close?.removeEventListener('click', eventHandlers.handleClose);
			fullscreenToggle?.removeEventListener('click', toggleFullScreen);
		};
	}, [refs, hotspots, currentHotspotIdx, setCurrentHotspotIdx]);
};
