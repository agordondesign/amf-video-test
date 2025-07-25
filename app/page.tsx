import HotspotVideo from '@/components/VideoPlayerNew';
// import HotspotVideoDebug from '@/components/HotspotVideoDebug';
// import SimpleVideoTest from '@/components/SimpleVideoTest';
//import VideoPlayerNew from '@/components/VideoPlayerNew';
//import VideoPlayer from '@/components/VideoPlayer';

export default function Home() {
	return (
		<>
			{/*<div className="grid grid-rows min-h-screen w-auto pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-pink-50">*/}
			{/*<main className="flex w-full h-auto gap-[12px] aspect-video">*/}
			<div className="flex flex-col justify-center items-center w-full gap-8 p-4">
				<HotspotVideo />
			</div>
			{/*</main>*/}
			{/*</div >*/}
		</>
	);
}
