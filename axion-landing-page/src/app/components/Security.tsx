'use client';

import React from 'react';
import {
	EarthLock,
	FolderKey,
	Logs,
	Fingerprint,
	ShieldPlus,
} from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Security = () => {
	const items = [
		{
			title: 'HIPAA Compliant',
			description: 'Meets all healthcare data protection standards',
			header: (
				<Image
					className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
					src="https://plus.unsplash.com/premium_photo-1698084059560-9a53de7b816b?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
					width={512}
					height={288}
				/>
			),
			icon: <EarthLock className="h-6 w-6 text-neutral-500" />,
		},
		{
			title: 'End-to-End Encryption',
			description: 'Your data is encrypted at rest and in transit',
			header: (
				<Image
					className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
					src="https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
					width={512}
					height={288}
				/>
			),
			icon: <FolderKey className="h-6 w-6 text-neutral-500" />,
		},
		{
			title: 'Audit Logs',
			description: 'Track all access to your medical records.',
			header: (
				<Image
					className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
					src="https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
					width={512}
					height={288}
				/>
			),
			icon: <Logs className="h-6 w-6 text-neutral-500" />,
		},
		{
			title: 'Enterprise-Grade Security',
			description:
				'Your health data is encrypted, secure, and accessible only to you and authorized professionals. We comply with HIPAA, GDPR, and HL7 standards.',
			header: (
				<Image
					className="flex flex-1 h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
					src="/enterprise_security.jpg"
					alt=""
					width={1024}
					height={576}
				/>
			),
			icon: <ShieldPlus className="h-6 w-6 text-neutral-500" />,
		},
		{
			title: 'Multi-Factor Authentication',
			description: 'Extra layer of security for your account',
			header: (
				<Image
					className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
					src="https://plus.unsplash.com/premium_photo-1674582744373-c0805c281744?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
					width={512}
					height={288}
				/>
			),
			icon: <Fingerprint className="h-6 w-6 text-neutral-500" />,
		},
	];

	return (
		<motion.section
			className="py-20 bg-accent/5"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.5 }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Security & Compliance
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Your health data is protected by industry-leading
						security measures
					</p>
				</div>
				<BentoGrid className="max-w-full mx-auto">
					{items.map((item, i) => (
						<BentoGridItem
							key={i}
							title={item.title}
							description={item.description}
							header={item.header}
							icon={item.icon}
							className={
								i === 3 || i === 6 ? 'md:col-span-2' : ''
							}
						/>
					))}
				</BentoGrid>
			</div>
		</motion.section>
	);
};

export { Security };
