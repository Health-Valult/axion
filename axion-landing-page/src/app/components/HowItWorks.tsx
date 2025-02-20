'use client';

import { motion } from 'framer-motion';

export const HowItWorks = () => {
	const steps = [
		{
			number: '01',
			title: 'Sign Up & Create Your Profile',
			description:
				'Create your secure account and set up your health profile in minutes.',
			image: 'https://images.unsplash.com/photo-1537884944318-390069bb8665?auto=format&fit=crop&w=600&q=80',
		},
		{
			number: '02',
			title: 'Upload or Sync Your Medical Records',
			description:
				'Easily upload your existing medical records or sync with your healthcare providers.',
			image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
		},
		{
			number: '03',
			title: 'Share with Your Healthcare Providers',
			description:
				'Securely share your medical history with authorized healthcare professionals.',
			image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
		},
		{
			number: '04',
			title: 'Manage Your Health',
			description:
				'Get insights, set reminders, and take control of your health journey.',
			image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
		},
	];

	return (
		<motion.section
			id="how-it-works"
			className="py-20"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						How It Works
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Get started with HealthVault in four simple steps
					</p>
				</div>
				<div className="grid md:grid-cols-2 gap-12 items-center">
					{steps.map((step, index) => (
						<motion.div
							key={index}
							className="relative group"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger effect
							viewport={{ once: true }}
						>
							<div className="overflow-hidden rounded-2xl shadow-lg">
								<img
									src={step.image}
									alt={step.title}
									className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute inset-0 bg-black/40 rounded-2xl group-hover:bg-black/50 transition-colors" />
								<div className="absolute inset-0 p-6 flex flex-col justify-end">
									<span className="text-4xl font-bold text-white/80 mb-2">
										{step.number}
									</span>
									<h3 className="text-xl font-semibold text-white mb-2">
										{step.title}
									</h3>
									<p className="text-white/90">
										{step.description}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
};
