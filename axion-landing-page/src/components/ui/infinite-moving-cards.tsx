/* eslint-disable */
'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Image from 'next/image';

export const InfiniteMovingCards = ({
	items,
	direction = 'left',
	speed = 'fast',
	pauseOnHover = true,
	className,
}: {
	items: {
		quote: string;
		name: string;
		title: string;
		image: string;
	}[];
	direction?: 'left' | 'right';
	speed?: 'fast' | 'normal' | 'slow';
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);

	const [start, setStart] = useState(false);
	const isDuplicated = useRef(false); // Prevent infinite cloning

	useEffect(() => {
		if (!isDuplicated.current) {
			addAnimation();
			isDuplicated.current = true; // Mark as duplicated
		}
	}, []); // Empty dependency array to run only once

	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			// Prevent multiple duplications
			if (scrollerContent.length > 0 && !isDuplicated.current) {
				scrollerContent.forEach((item) => {
					const duplicatedItem = item.cloneNode(true);
					scrollerRef.current?.appendChild(duplicatedItem);
				});
			}

			getDirection();
			getSpeed();
			setStart(true);
		}
	}
	const getDirection = () => {
		if (containerRef.current) {
			if (direction === 'left') {
				containerRef.current.style.setProperty(
					'--animation-direction',
					'forwards'
				);
			} else {
				containerRef.current.style.setProperty(
					'--animation-direction',
					'reverse'
				);
			}
		}
	};
	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === 'fast') {
				containerRef.current.style.setProperty(
					'--animation-duration',
					'20s'
				);
			} else if (speed === 'normal') {
				containerRef.current.style.setProperty(
					'--animation-duration',
					'40s'
				);
			} else {
				containerRef.current.style.setProperty(
					'--animation-duration',
					'80s'
				);
			}
		}
	};
	return (
		<div
			ref={containerRef}
			className={cn(
				'scroller relative z-20  max-w-7xl mt-0 overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					' flex min-w-full shrink-0 gap-4 w-max flex-nowrap',
					start && 'animate-scroll ',
					pauseOnHover && 'hover:[animation-play-state:paused]'
				)}
			>
				{items.map((item) => (
					<li
						className="w-[350px] max-w-full relative rounded-2xl border-none flex-shrink-0 px-8 py-6 md:w-[450px]"
						style={{
							background: 'transparent',
						}}
						key={item.name}
					>
						<blockquote>
							<div
								aria-hidden="true"
								className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
							></div>
							<Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
								<CardHeader className="pb-2">
									{' '}
									{/* Reduced padding at bottom */}
									<div className="flex items-center gap-3">
										{' '}
										{/* Reduced gap */}
										<Image
											src={item.image}
											alt={item.name}
											width={40} // Set width explicitly
											height={40} // Set height explicitly
											className="rounded-full object-cover"
										/>
										<div>
											<h4 className="font-semibold text-gray-900">
												{item.name}
											</h4>
											<p className="text-sm text-gray-600">
												{item.title}
											</p>
										</div>
									</div>
								</CardHeader>
								<CardBody className="pt-2">
									{' '}
									{/* Reduced top padding */}
									<div className="relative flex items-start">
										<MessageSquareQuote className="h-5 w-5 text-primary/20 absolute left-0 top-1" />
										<p className="text-gray-600 pl-8">
											{item.quote}
										</p>{' '}
										{/* Adjusted padding */}
									</div>
								</CardBody>
							</Card>
						</blockquote>
					</li>
				))}
			</ul>
		</div>
	);
};
