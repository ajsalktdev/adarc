'use client';
import { useEffect, useRef, useState } from 'react';

export default function LazyLoadSection({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.25 } // Load when 25% is in viewport
		);

		if (ref.current) observer.observe(ref.current);

		return () => observer.disconnect();
	}, []);

	return <div ref={ref}>{isVisible ? children : null}</div>;
}
