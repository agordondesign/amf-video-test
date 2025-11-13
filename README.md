This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🎬 Enhanced Custom Video Player with Interactive Hotspots

This project features a sophisticated, cutting-edge video player module with ultra-modern custom controls, built for immersive interactive video experiences with dynamic hotspots and elegant overlay systems.

### ✨ Premium Features

- **🎨 Ultra-Modern Video Controls**: Next-generation custom controls with sleek animations and premium styling
- **🎯 Interactive Hotspots**: Animated location-pin hotspots that trigger immersive overlay videos
- **🔄 Smart Auto-hiding**: Intelligent mouse detection with smooth fade transitions
- **🖱️ Advanced Dragging**: Fluid draggable progress and volume controls with visual feedback
- **⚡ Smooth Animations**: Sophisticated transitions and micro-interactions throughout
- **📱 Mobile-Responsive**: Optimized touch interactions for all device sizes
- **🎪 Fullscreen Experience**: Native fullscreen with custom-styled interface
- **🌈 Gradient Design**: Beautiful pink-to-purple-to-lime gradients with glassmorphism effects

### 🎛️ Enhanced Control Features

#### **🎯 Hotspot System**

- **Animated Location Pin Icon**: Modern map-pin icon with subtle pulse animation
- **Gradient Bubble Design**: Glass-morphism background with multi-color gradients
- **Hover Transformations**: Scale, glow, and color transitions on interaction
- **Smart Positioning**: Dynamically positioned based on video timeline

#### **🎮 Ultra-Slim Single-Row Video Controls**

- **Compact Layout**: All controls arranged in one sleek, horizontal bar
- **Inline Progress Bar**: Progress bar seamlessly integrated between timecode and volume
- **Glassmorphism Design**: Backdrop blur with translucent backgrounds
- **Enhanced Progress Bar**:
  - Responsive bar that expands on hover with smooth transitions
  - Tactile progress thumb with scale effects
  - Real-time time preview tooltip with modern styling
  - Gradient fill from pink through purple to lime
- **Smart Volume Control**:
  - Hover-revealed volume slider with fade transitions
  - Enhanced visual feedback during interaction
  - Compact design that doesn't compromise functionality
- **Optimized Buttons**:
  - Rounded corners with subtle hover background effects
  - Scale animations on interaction (hover/active states)
  - Perfect spacing and touch targets in minimal footprint
- **Seamless Video Preloading**: All videos preloaded for instant, buffer-free playback

#### **🌟 Visual Enhancements**

- **Background Gradient**: Rich dark gradient backdrop for cinematic feel
- **Container Styling**: Rounded corners, shadows, and border effects
- **Ambient Lighting**: Subtle glow effects around the video player
- **Enhanced Typography**: Better contrast and readability

### Components

#### `CustomVideoControls`

The main custom controls component that provides:

- **Play/pause button** with dynamic icons
- **Draggable progress bar** with gradient styling and hover effects
- **Time preview tooltip** shows time on progress bar hover
- **Skip forward/backward buttons** (configurable time intervals)
- **Draggable volume control** with hover-to-show slider
- **Fullscreen toggle button**
- **Time display** (current/total duration)
- **Smart auto-hiding behavior**:
  - Controls show on mouse enter
  - Controls hide on mouse leave (during playback)
  - Controls stay visible when hovering over them
  - Configurable auto-hide delay

#### `VideoPlayerNew` (HotspotVideo)

Advanced video player with hotspot functionality:

- Main video with custom controls
- Overlay video system for interactive content
- Hotspot positioning and interaction
- Fullscreen capabilities
- Caption support

#### `VideoPlayer`

Simple sequential video player:

- Plays through multiple video files in sequence
- Custom controls integration
- Responsive design

#### `VideoControlsDemo`

Comprehensive demo component showcasing all enhanced features:

- Interactive examples of all control features
- Feature documentation and usage instructions
- Live demonstration of mouse interactions

### Interactive Features

#### **Enhanced Mouse Interactions**

- **Mouse Enter:** Controls instantly appear
- **Mouse Leave:** Controls auto-hide after delay (only during playback)
- **Controls Hover:** Keeps controls visible when hovering over them
- **Dragging:** Prevents auto-hide during progress/volume dragging

#### **Draggable Progress Bar**

- **Click to Seek:** Click anywhere on progress bar to jump to that time
- **Drag to Scrub:** Click and drag the progress thumb for smooth scrubbing
- **Time Preview:** Hover over progress bar to see time tooltip
- **Visual Feedback:** Progress thumb scales and becomes visible when dragging

#### **Enhanced Volume Control**

- **Hover to Show:** Volume slider appears on mouse hover
- **Draggable Slider:** Click and drag to adjust volume precisely
- **Visual Feedback:** Volume thumb appears when dragging
- **Mute Toggle:** Click volume icon to mute/unmute

### Usage

#### Basic Usage

```tsx
import { useRef } from 'react';
import CustomVideoControls from './components/CustomVideoControls';

const MyVideoPlayer = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<div className="relative">
			<video ref={videoRef} src="/my-video.mp4" className="w-full" />
			<CustomVideoControls videoRef={videoRef} />
		</div>
	);
};
```

#### Advanced Usage with Custom Settings

```tsx
<CustomVideoControls
	videoRef={videoRef}
	skipTime={15} // Custom skip time in seconds
	autoHideDelay={4000} // Auto-hide delay in milliseconds
	className="custom-class" // Additional CSS classes
/>
```

### Configuration

The video player behavior can be customized through the `VIDEO_CONFIG` object in `lib/config.ts`:

```typescript
export const VIDEO_CONFIG = {
	// Video sources
	mainVideo: '/path/to/main-video.mp4',
	overlayVideo: '/path/to/overlay-video.mp4',

	// Captions
	captionsPath: '/path/to/captions.vtt',
	captionsLanguage: 'en',
	captionsLabel: 'English',

	// Controls behavior
	controlsAutoHideDelay: 3000, // milliseconds
	skipTimeAmount: 10, // seconds
	resetDelay: 50, // milliseconds
};
```

### Styling

The components use Tailwind CSS with custom gradients and animations:

- Pink to lime gradient on progress bars and controls
- Smooth transitions and hover effects
- Responsive design that works on mobile and desktop
- Dark theme optimized for video viewing

All styles are configurable through the `COMPONENT_STYLES` object in the config file.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
