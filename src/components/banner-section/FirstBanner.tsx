// components/FirstBanner.tsx (NO "use client")
import Image from "next/image";
import Link from "next/link";

export default function FirstBanner({ banner }: { banner: any }) {
	if (!banner) return null;

	return (
		<Link
			href={banner.link || "#"}
			className="block relative w-full pt-[34.27%]">
			<Image
				src={banner.image}
				alt="Main banner"
				fill
				priority
				className="rounded-md object-cover"
			/>
		</Link>
	);
}
