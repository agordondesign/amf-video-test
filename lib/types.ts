export interface Hotspot {
	startTime: number;
	endTime: number;
	title: string;
	text: string;
	link: string;
}

export interface VideoPlayerRefs {
	videoRef: React.RefObject<HTMLVideoElement | null>;
	video2Ref: React.RefObject<HTMLVideoElement | null>;
	hotspotRef: React.RefObject<HTMLDivElement | null>;
	descriptionRef: React.RefObject<HTMLDivElement | null>;
	labelRef: React.RefObject<HTMLDivElement | null>;
	closeRef: React.RefObject<HTMLDivElement | null>;
	fullscreenToggleRef: React.RefObject<HTMLButtonElement | null>;
}
