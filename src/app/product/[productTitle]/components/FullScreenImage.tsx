import { cn } from "@/utils/utils";
import Image from "next/image";
import React, { useState } from "react";

export default function FullScreenImage({ data,closeModal,isActive }: any) {
	const [active, setActive] = useState(isActive || 0);


	return (
		<div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
			<div className="bg-white relative flex flex-row w-[90%] max-w-full h-[90vh] rounded-lg overflow-hidden">
				{/* Close Button */}
				<button
					className="absolute top-4 right-4 text-black text-xl font-bold"
					onClick={closeModal}>
					×
				</button>

				{/* Left-side Thumbnails */}
				<div className=" w-[120px] overflow-y-auto border-r p-5 space-y-3">
					{data?.attachments?.map((item: any, index: number) => (
						<div
							key={index}
							onClick={() => setActive(index)}
							className={cn(
								"cursor-pointer rounded-md overflow-hidden  h-[80px] flex items-center border-solid border justify-center",
								active === index
									? "border-black"
									: "border-gray-300"
							)}>
							<Image
								loading="lazy"
								src={item.attachment}
								alt={`modal-thumb-${index}`}
								width={80}
								height={80}
								className="object-contain w-[90%] max-h-[90%]"
							/>
						</div>
					))}
				</div>

				{/* Large Image */}
				<div className="flex-1 flex items-center justify-center p-4">
					<Image
						loading="lazy"
						src={data?.attachments[active]?.attachment}
						alt="largeImage"
						width={800}
						height={800}
						className="max-h-full object-contain"
					/>
				</div>
			</div>
		</div>
	);
}
