// Video player component configuration and constants

export const VIDEO_CONFIG = {
	// Default video sources
	mainVideo: '/video1.mp4',
	overlayVideo: '/video2.mp4',

	// Captions configuration
	captionsPath: '/captions/video2.vtt',
	captionsLanguage: 'en',
	captionsLabel: 'English',

	// Video reset delay (in milliseconds)
	resetDelay: 50,

	// Container IDs
	containerId: 'video-player-container',
	subContainerId: 'video-player-subcontainer',
} as const;

export const COMPONENT_STYLES = {
	container: 'flex flex-col items-start gap-4 text-white w-full',
	subContainer: 'relative w-full',
	fullscreenButton:
		'text-gray-400 border-2 border-pink-500 hover:border-lime-500 rounded-full px-2 py-1 absolute z-30 top-4 right-4',
	closeButton:
		'absolute z-30 right-4 top-4 px-2 rounded-full bg-white/50 text-black/50 hover:bg-white/100 hover:text-black/100 border-black/50 hover:border-black/100',
	hotspotLabel:
		'absolute flex justify-center items-center text-center w-18 h-18 pt-1 text-[#C51F87]/70 font-semibold drop-shadow-xl z-10 left-6 bottom-20 text-sm leading-tight border border-black/50 bg-[#BCE349]/50 rounded-full transition-all duration-200 hover:bg-[#BCE349] hover:text-[#C51F87] hover:scale-105 hover:drop-shadow-md hover:cursor-pointer',
	overlayVideo: 'absolute w-full z-20',
	mainVideo: 'w-full',
	description:
		'w-full max-w-4xl min-h-[50px] border-2 border-gray-600 p-2 text-sm text-white hidden',
} as const;
