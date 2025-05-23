import VideoPlayerNew from '@/components/VideoPlayerNew';
//import VideoPlayer from '@/components/VideoPlayer';

export default function Home() {
	return (
		<>
			<div className="grid grid-rows min-h-screen pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				<main className="flex flex-col gap-[12px]">
					<ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] pb-4">
						<li className="mb-2 tracking-[-.01em]">
							Three (3) separate overlay buttons will appear over the main video
							at sepparate times.
						</li>
						<li className="mb-2 tracking-[-.01em]">
							Click on the buttons to see the video change with a close button
							to exit the video.
						</li>
						<li className="mb-2 tracking-[-.01em]">
							When a button is clicked the main video will pause and resume
							where it left off once the video ends or is exited.
						</li>
					</ol>

					<div className="flex items-center w-full">
						<VideoPlayerNew />
					</div>
				</main>
			</div>
		</>
	);
}
