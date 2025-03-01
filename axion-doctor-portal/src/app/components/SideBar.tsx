'use client';

import { ReactNode } from 'react';
import { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import {
	LayoutDashboard,
	House,
	Stethoscope,
	Pill,
	ClipboardList,
	FileClock,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
	DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,
} from '@nextui-org/react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export const AxionLogo = ({
	width,
	height,
}: {
	width: number;
	height: number;
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 340 341"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_d_653_1478)">
				<path
					d="M206.607 203.756C219.139 191.225 239.457 191.225 251.988 203.756L314.087 265.855C326.618 278.386 326.618 298.704 314.087 311.236C301.555 323.767 281.237 323.767 268.706 311.236L206.607 249.137C194.076 236.606 194.076 216.288 206.607 203.756Z"
					fill="url(#paint0_linear_653_1478)"
				/>
				<rect
					x="110.521"
					y="153.051"
					width="151.999"
					height="64.1782"
					rx="32.0891"
					transform="rotate(-135 110.521 153.051)"
					fill="url(#paint1_linear_653_1478)"
				/>
				<rect
					x="124.524"
					y="167.094"
					width="236.307"
					height="64.1782"
					rx="32.0891"
					transform="rotate(-45 124.524 167.094)"
					fill="url(#paint2_linear_653_1478)"
				/>
				<rect
					x="3"
					y="288.619"
					width="151.999"
					height="64.1782"
					rx="32.0891"
					transform="rotate(-45 3 288.619)"
					fill="url(#paint3_linear_653_1478)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_653_1478"
					x="0.191992"
					y="1.19199"
					width="339.616"
					height="339.616"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy="4" />
					<feGaussianBlur stdDeviation="8.05" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_653_1478"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_653_1478"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_653_1478"
					x1="283.037"
					y1="234.806"
					x2="237.657"
					y2="280.186"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#D74B76" />
					<stop offset="1" stopColor="#C81A55" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_653_1478"
					x1="186.253"
					y1="217.23"
					x2="186.789"
					y2="153.051"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#EE6158" />
					<stop offset="1" stopColor="#C44545" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_653_1478"
					x1="124.524"
					y1="199.183"
					x2="360.831"
					y2="199.183"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#CC1A3E" />
					<stop offset="1" stopColor="#F7B251" />
				</linearGradient>
				<linearGradient
					id="paint3_linear_653_1478"
					x1="154.999"
					y1="320.321"
					x2="3"
					y2="321.095"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#552265" />
					<stop offset="1" stopColor="#400C4C" />
				</linearGradient>
			</defs>
		</svg>
	);
};

interface Component {
	children: ReactNode;
}

const SideBar: React.FC<Component> = ({ children }) => {
	const links = [
		{
			label: 'Home',
			href: '/',
			icon: (
				<House className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: 'Dashboard',
			href: '/dashboard',
			icon: (
				<LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: 'Diagnosis',
			href: '/diagnosis',
			icon: (
				<Stethoscope className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: 'Lab Reports',
			href: '/lab-reports',
			icon: (
				<ClipboardList className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: 'Prescription',
			href: '/prescriptions',
			icon: (
				<Pill className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
		{
			label: 'History',
			href: '/history',
			icon: (
				<FileClock className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
			),
		},
	];
	const [open, setOpen] = useState(false);
	const router = useRouter();
	return (
		<div
			className={cn(
				'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 md:overflow-hidden',
				'h-screen' // for your use case, use `h-screen` instead of `h-[60vh]`
			)}
		>
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
						{open ? <Logo /> : <LogoIcon />}
						<div className="mt-8 flex flex-col gap-2">
							{links.map((link, idx) => (
								<SidebarLink key={idx} link={link} />
							))}
						</div>
					</div>
					<div>
						<Dropdown placement="bottom-end">
							<DropdownTrigger>
								{!open ? (
									<Avatar
										isBordered
										as="button"
										className="transition-transform h-7 w-7 flex-shrink-0 rounded-full"
										src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
									/>
								) : (
									<div className="flex items-center gap-4">
										<Avatar
											isBordered
											as="button"
											className="transition-transform h-7 w-7 flex-shrink-0 rounded-full"
											src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
										/>
										<span className="font-semibold cursor-pointer">
											Dr. Steven James
										</span>
									</div>
								)}
							</DropdownTrigger>
							<DropdownMenu
								aria-label="Profile Actions"
								variant="flat"
							>
								<DropdownItem
									key="profile"
									className="h-14 gap-2"
								>
									<p className="font-semibold">
										Signed in as
									</p>
									<p className="font-semibold">
										Dr. Steven James
									</p>
								</DropdownItem>
								<DropdownItem
									key="edit"
									onPress={() => router.push('/settings')}
								>
									Settings
								</DropdownItem>
								<DropdownItem key="help_and_feedback">
									Contact Support
								</DropdownItem>
								<DropdownItem key="logout" color="danger">
									Log Out
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</SidebarBody>
			</Sidebar>
			<div className="flex-1 bg-white dark:bg-black">{children}</div>
		</div>
	);
};

export default SideBar;

export const Logo = () => {
	return (
		<Link
			href="/"
			className="font-normal flex space-x-2 items-center text-lg text-black py-1 relative z-20"
		>
			<AxionLogo width={22} height={22} />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="font-medium text-black dark:text-white whitespace-pre"
			>
				Axion
			</motion.span>
		</Link>
	);
};

export const LogoIcon = () => {
	return (
		<Link
			href="/"
			className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
		>
			<AxionLogo width={32} height={32} />
		</Link>
	);
};
