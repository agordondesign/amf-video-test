// Video player component configuration and constants

export const VIDEO_CONFIG = {
  // Default video sources
  mainVideo: "/APST1201 Skytrofa IFU Auto Injector Video.mp4",
  overlayVideo: "/scene/Scene 3- HH_charge your auto-injector.mp4",

  // Captions configuration
  captionsPath: "/captions.vtt",
  captionsLanguage: "en",
  captionsLabel: "English",

  // Video reset delay (in milliseconds)
  resetDelay: 50,

  // Container IDs
  containerId: "video-player-container",
  subContainerId: "video-player-subcontainer",

  // Custom controls configuration
  controlsAutoHideDelay: 3000, // milliseconds
  skipTimeAmount: 10, // seconds
  showHoverTimePreview: true, // show time tooltip on progress bar hover
  enableDraggableProgress: true, // enable draggable progress bar
} as const;

export const COMPONENT_STYLES = {
  container: "flex flex-col items-start gap-4 text-white w-full relative",
  subContainer: "relative w-full overflow-hidden",
  fullscreenButton:
    "text-white/80 border-2 border-white/20 hover:border-white hover:text-white bg-black/30 backdrop-blur-sm px-3 py-2 absolute z-30 top-4 right-4 transition-all duration-300 hover:scale-105 active:scale-95",
  closeButton:
    "absolute z-30 right-4 top-4 px-5 py-3 bg-white/80 text-black hover:bg-white hover:text-black border border-gray-300 hover:border-gray-400 rounded-full transition-all duration-300 hover:scale-105 active:scale-95",
  hotspotLabel:
    "absolute flex justify-center items-center text-center w-28 h-28 text-white/90 font-bold drop-shadow-2xl z-10 left-1 bottom-2 sm:left-6 sm:bottom-12 text-xs leading-none transition-all duration-300 ease-out hover:scale-110 hover:cursor-pointer active:scale-95",
  overlayVideo: "absolute w-full z-20",
  mainVideo: "w-full",
  description:
    "w-full max-w-4xl min-h-[50px] border-2 border-gray-600 p-2 text-sm text-white hidden",

  // Enhanced video controls styles
  videoControlsContainer: "relative group",
  controlsOverlay: "absolute inset-0 bg-black/50 pointer-events-none",
  controlsWrapper: "relative p-6 flex flex-col gap-4",
  progressBarContainer: "group cursor-pointer relative",
  progressBar:
    "h-1 bg-white/20 relative overflow-hidden group-hover:h-2 transition-all duration-300 ease-out",
  progressFill: "h-full bg-white transition-all duration-150",
  progressThumb:
    "absolute top-1/2 w-4 h-4 bg-white transform -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110",
  controlsMain:
    "flex items-center justify-between backdrop-blur-sm bg-black/20 px-4 py-2",
  controlsLeft: "flex items-center gap-5",
  controlsRight: "flex items-center gap-5",
  controlButton:
    "text-white/90 hover:text-white transition-all duration-200 p-2 hover:bg-white/10 active:scale-95",
  volumeContainer: "flex items-center gap-3 group",
  volumeSlider:
    "w-24 h-1.5 bg-white/20 cursor-pointer relative overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300",
  volumeFill: "h-full bg-white",
  timeDisplay:
    "text-white/90 text-sm font-mono bg-black/30 px-3 py-1 backdrop-blur-sm",
} as const;
