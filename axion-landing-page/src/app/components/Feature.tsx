'use client';

import { FeaturesSectionWithHoverEffects } from '@/components/feature-section-with-hover-effects';
import { motion } from 'framer-motion';

export const Feature = () => {
	return (
		<motion.section
			id="features"
			className="py-20 bg-gray-50"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto px-4">
				{/* Header Section */}
				<motion.div
					className="text-center mb-10"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
					viewport={{ once: true }}
				>
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						Key Features
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Everything you need to manage your health journey in one
						secure platform.
					</p>
				</motion.div>

				{/* Features Section */}
				<motion.div
					className="w-full"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
				>
					<FeaturesSectionWithHoverEffects />
				</motion.div>
			</div>
		</motion.section>
	);
};
