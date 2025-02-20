'use client';

import { motion } from 'framer-motion';
import {
	Hospital,
	UserCircle,
	Stethoscope,
	Upload,
	ClipboardList,
	Bell,
	FileText,
	PenTool,
} from 'lucide-react';

const stakeholders = [
	{
		title: 'Patients',
		description:
			'Access medical records, get health updates, and manage medication reminders seamlessly through web and mobile.',
		icon: UserCircle,
		image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
		features: [
			{ text: 'View Medical Reports', icon: FileText },
			{ text: 'Medication Reminders', icon: Bell },
		],
		gradient: 'from-blue-50 to-purple-50',
	},
	{
		title: 'Hospitals',
		description:
			'Efficiently manage and upload patient records while maintaining secure access to comprehensive medical histories.',
		icon: Hospital,
		image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=400&q=80',
		features: [
			{ text: 'Upload Medical Records', icon: Upload },
			{ text: 'Manage Patient Data', icon: ClipboardList },
		],
		gradient: 'from-orange-50 to-yellow-50',
	},
	{
		title: 'Doctors',
		description:
			'Review patient histories, prescribe medications, and monitor health progress through detailed analytics.',
		icon: Stethoscope,
		image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
		features: [
			{ text: 'Patient Analytics', icon: ClipboardList },
			{ text: 'Prescribe Medicine', icon: PenTool },
		],
		gradient: 'from-purple-50 to-pink-50',
	},
];

export const StakeholderSection = () => {
	return (
		<motion.section
			id="stakeholders"
			className="py-20 bg-gray-50"
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
			viewport={{ once: true }}
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
						Tailored for Every Stakeholder
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						Powerful features designed specifically for patients,
						hospitals, and doctors
					</p>
				</div>

				{/* Grid Layout for Stakeholder Cards */}
				<div className="grid md:grid-cols-3 gap-8">
					{stakeholders.map((item, index) => (
						<motion.div
							key={item.title}
							className={`p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border border-gray-100 transform hover:-translate-y-1 transition-all duration-300`}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger effect
							viewport={{ once: true }}
						>
							<div className="h-48 mb-6 rounded-xl overflow-hidden">
								<img
									src={item.image}
									alt={item.title}
									className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
								/>
							</div>
							<div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center shadow-sm mb-6">
								<item.icon className="h-6 w-6 text-primary" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-4">
								{item.title}
							</h3>
							<p className="text-gray-600 mb-6">
								{item.description}
							</p>
							<div className="space-y-4">
								{item.features.map((feature) => (
									<div
										key={feature.text}
										className="flex items-center space-x-3"
									>
										<feature.icon className="h-5 w-5 text-secondary" />
										<span className="text-gray-700">
											{feature.text}
										</span>
									</div>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</motion.section>
	);
};
