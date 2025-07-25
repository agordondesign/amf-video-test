interface ExtendedHTMLElement extends HTMLElement {
	webkitRequestFullscreen?: () => Promise<void>;
	mozRequestFullScreen?: () => Promise<void>;
	msRequestFullscreen?: () => Promise<void>;
}

export const toggleFullScreen = async (): Promise<void> => {
	const container = document.getElementById(
		'video-player-container'
	) as ExtendedHTMLElement;
	if (!container) return;

	const fullscreenApi =
		container.requestFullscreen ||
		container.webkitRequestFullscreen ||
		container.mozRequestFullScreen ||
		container.msRequestFullscreen;

	if (!document.fullscreenElement && fullscreenApi) {
		await fullscreenApi.call(container);
	} else {
		await document.exitFullscreen?.();
	}
};
