'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import NumberFlow from '@/components/ui/number-flow';
import confetti from 'canvas-confetti';

const pricingOptions = {
	title: 'Personalized Health Plans for Every Need',
	description: 'Choose the plan that fits your health journey.',
	plans: [
		{
			name: 'STARTER',
			price: 9.99,
			yearlyPrice: 99.99,
			period: 'per month',
			features: [
				'Track up to 3 types of medical reports',
				'Free 3-month trial',
				'Multi-language support',
				'Personalized patient dashboard with health charts',
				'Upload prescriptions directly from doctors',
			],
			description:
				'Perfect for individuals who want a simple way to manage their health records.',
			buttonText: 'Start Free Trial',
			href: '/sign-up',
			isPopular: false,
		},
		{
			name: 'PRO',
			price: 19.99,
			yearlyPrice: 199.99,
			period: 'per month',
			features: [
				'Track up to 8 types of medical reports',
				'Multi-language support',
				'Personalized patient dashboard with health insights',
				'Upload prescriptions directly from doctors',
				'Diagnosis timeline for doctors to monitor health trends',
				'Emergency contacts for quick access in critical situations',
				'Medication reminders to stay on top of prescriptions',
			],
			description:
				'Ideal for individuals managing chronic conditions or regular medical follow-ups.',
			buttonText: 'Get Started',
			href: '/sign-up',
			isPopular: true,
		},
		{
			name: 'ULTIMATE',
			price: 39.99,
			yearlyPrice: 399.99,
			period: 'per month',
			features: [
				'Track up to 10 types of medical reports',
				'AI-powered health recommendations',
				'Blockchain-based audit logs for enhanced security',
				'Download & store medical records offline',
				'Diagnosis timeline for long-term medical insights',
				'Emergency contacts & real-time alerts',
				'Medication reminders to manage prescriptions',
			],
			description:
				'For individuals who want complete control over their medical history with top-tier security and AI insights.',
			buttonText: 'Contact Support',
			href: '/contact',
			isPopular: false,
		},
	],
};

export default function Pricing() {
	const [isYearly, setIsYearly] = useState(false);

	const handleToggle = () => {
		setIsYearly(!isYearly);
		if (!isYearly) {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		}
	};

	return (
		<motion.section
			id="pricing"
			className={cn('py-16 md:py-24')}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			viewport={{ once: true }}
		>
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<h2 className="text-xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
						{pricingOptions.title}
					</h2>
					<p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
						{pricingOptions.description}
					</p>
					<div className="flex items-center space-x-2">
						<span className="text-sm font-medium">Monthly</span>
						<Switch
							checked={isYearly}
							onCheckedChange={handleToggle}
						/>
						<span className="text-sm font-medium">Yearly</span>
						{isYearly && (
							<Badge variant="new" className="ml-2">
								Save 20%
							</Badge>
						)}
					</div>
				</div>
				<div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3 lg:gap-8">
					{pricingOptions.plans.map((plan, index) => (
						<motion.div
							key={plan.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger effect
							viewport={{ once: true }}
						>
							<Card
								className={cn(
									'flex h-full flex-col p-6',
									plan.isPopular && 'border-primary shadow-lg'
								)}
							>
								{plan.isPopular && (
									<Badge
										className="absolute -top-2 right-4"
										variant="new"
									>
										Most Popular
									</Badge>
								)}
								<div className="flex-1 space-y-4">
									<h3 className="text-xl font-bold">
										{plan.name}
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{plan.description}
									</p>
									<div className="flex items-baseline">
										<span className="text-2xl font-bold">
											$
										</span>
										<AnimatePresence mode="wait">
											<span className="text-3xl font-bold text-primary">
												<NumberFlow
													key={
														isYearly
															? 'yearly'
															: 'monthly'
													}
													value={
														isYearly
															? plan.yearlyPrice
															: plan.price
													}
													format={{
														minimumFractionDigits: 0,
													}}
												/>
											</span>
										</AnimatePresence>
										<span className="ml-1 text-xl text-gray-500">
											/{isYearly ? 'year' : 'month'}
										</span>
									</div>
									<ul className="space-y-2">
										{plan.features.map((feature) => (
											<li
												key={feature}
												className="flex items-center text-lg text-gray-500"
											>
												<Check className="mr-2 h-4 w-4 text-primary" />
												{feature}
											</li>
										))}
									</ul>
								</div>
								<Button
									className="mt-6 w-full"
									variant={'default'}
								>
									{plan.buttonText || 'Get Started'}
								</Button>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
