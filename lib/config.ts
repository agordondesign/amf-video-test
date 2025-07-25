// Video player component configuration and constants

export const VIDEO_CONFIG = {
	// Default video sources
	mainVideo: '/APST1201 Skytrofa IFU Auto Injector Video.mp4',
	overlayVideo: '/scene/Scene 3- HH_charge your auto-injector.mp4',

	// Captions configuration
	captionsPath: '/captions.vtt',
	captionsLanguage: 'en',
	captionsLabel: 'English',

	// Video reset delay (in milliseconds)
	resetDelay: 50,

	// Container IDs
	containerId: 'video-player-container',
	subContainerId: 'video-player-subcontainer',

	// Custom controls configuration
	controlsAutoHideDelay: 3000, // milliseconds
	skipTimeAmount: 10, // seconds
	showHoverTimePreview: true, // show time tooltip on progress bar hover
	enableDraggableProgress: true, // enable draggable progress bar
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

	// Custom video controls styles
	videoControlsContainer: 'relative group',
	controlsOverlay:
		'absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent border border-black pointer-events-none',
	controlsWrapper: 'relative p-4 flex flex-col gap-3',
	progressBarContainer: 'group cursor-pointer',
	progressBar:
		'h-1 bg-white/30 rounded-full relative overflow-hidden group-hover:h-2 transition-all duration-200',
	progressFill:
		'h-full bg-gradient-to-r from-pink-500 to-lime-500 rounded-full transition-all duration-100',
	progressThumb:
		'absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-lg transform -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200',
	controlsMain: 'flex items-center justify-between',
	controlsLeft: 'flex items-center gap-4',
	controlsRight: 'flex items-center gap-4',
	controlButton:
		'text-white hover:text-lime-400 transition-colors duration-200 p-1',
	volumeContainer: 'flex items-center gap-2 group',
	volumeSlider:
		'w-20 h-1 bg-white/30 rounded-full cursor-pointer relative overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200',
	volumeFill: 'h-full bg-gradient-to-r from-pink-500 to-lime-500 rounded-full',
	timeDisplay: 'text-white text-sm font-mono',
} as const;
