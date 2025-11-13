import HotspotVideo from '@/components/VideoPlayerNew';
//import VideoPlayerNew from '@/components/VideoPlayerNew';
//import VideoPlayer from '@/components/VideoPlayer';

export default function Home() {
	return (
		<div className="min-h-screen">
			<div className="w-full">
				{/* Simple container */}
				<div className="relative overflow-hidden bg-black">
					<HotspotVideo />
				</div>
			</div>
		</div>
	);
}
