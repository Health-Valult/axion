'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface Education {
	degree: string;
	affliatedInstitute: string;
	year: string;
}

interface EducationTimelineProps {
	qualifications: Education[];
}

export function EducationTimeline({ qualifications }: EducationTimelineProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<Card className="border-none shadow-none dark:bg-card/50 bg-white/90 backdrop-blur-sm">
				<CardHeader className="pb-2">
					<CardTitle className="text-xl font-montserrat">
						Qualifications
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="relative">
						{qualifications.map((item, index) => (
							<div
								key={index}
								className="relative flex items-start gap-4 pb-8 last:pb-0"
							>
								{/* Faint Connecting Line (Only if not last item) */}
								{index !== qualifications.length - 1 && (
									<div
										className="absolute left-[22px] top-10 w-0.5 bg-black dark:bg-white"
										style={{ height: 'calc(100% - 2rem)' }}
									></div>
								)}

								{/* Icon Container */}
								<div className="relative flex-shrink-0">
									<div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 border border-border">
										<GraduationCap className="h-5 w-5 text-primary" />
									</div>
								</div>

								{/* Education content */}
								<div className="flex-1 mb-5">
									<div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
										<h3 className="text-base font-semibold">
											{item.degree}
										</h3>
										<span className="text-sm text-muted-foreground">
											{item.year}
										</span>
									</div>

									<p className="text-sm text-foreground/80 mb-2">
										{item.affliatedInstitute}
									</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
