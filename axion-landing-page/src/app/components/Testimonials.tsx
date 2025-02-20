'use client';

import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { motion } from 'framer-motion';

export const Testimonials = () => {
	const testimonials = [
		{
			quote: "HealthVault has revolutionized how I manage my patients' records. The interface is intuitive and the security features are top-notch.",
			name: 'Dr. Sarah Johnson',
			title: 'Cardiologist',
			image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80',
		},
		{
			quote: 'Since using HealthVault, managing my chronic condition has never been easier. I love having all my medical records in one secure place.',
			name: 'Michael Chen',
			title: 'Patient',
			image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
		},
		{
			quote: 'The medication reminders and health insights have helped me stay on top of my treatment plan. Highly recommended!',
			name: 'Emily Rodriguez',
			title: 'Patient',
			image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
		},
	];

	return (
		<motion.section
			className="py-20 bg-white"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						What Our Users Say
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Trusted by healthcare professionals and patients alike
					</p>
				</div>
				<div className="rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
					<InfiniteMovingCards
						items={testimonials}
						direction="right"
						speed="slow"
					/>
				</div>
			</div>
		</motion.section>
	);
};
