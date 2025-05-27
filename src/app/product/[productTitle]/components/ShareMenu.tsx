import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

export default function ShareMenuWrapper({openShare, setOpenShare,isDesktop=false}:any) {
	const menuRef = useRef<HTMLDivElement>(null);

	// Handle clicks outside the share menu
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setOpenShare(false);
			}
		}

		if (openShare) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [openShare]);

	const shareUrl = typeof window !== "undefined" ? window.location.href : "";

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			alert("Link copied!");
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	return (
		<div className="relative ">
			{openShare && (
				<div
					ref={menuRef}
					className={`absolute flex flex-col gap-3 bg-gray-200 ${isDesktop ? "top-0" : 'bottom-10'} right-0 p-4  rounded-xl shadow-lg space-y-2 z-40 w-[300px] `}>
					<button
						onClick={copyToClipboard}
						className="flex items-center gap-2 text-sm text-gray-800 hover:text-blue-600 ">
						<FaLink color="black" size={20} />
						Copy Link
					</button>
					<a
						href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
							`Check this out: ${shareUrl}`
						)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 text-sm text-gray-800 hover:text-green-600">
						<FaWhatsapp color="green" size={20} />
						Share via WhatsApp
					</a>
					<a
						href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
							shareUrl
						)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 text-sm text-gray-800 hover:text-blue-700">
						<FaFacebookF color="#1877F2" size={20} />
						Share via Facebook
					</a>
				</div>
			)}
		</div>
	);
}
