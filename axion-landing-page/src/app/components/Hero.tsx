'use client';

import React from 'react';
import { Button } from '@heroui/button';
import { ChevronRight } from 'lucide-react';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import { Link } from '@heroui/link';

const words = [
	{
		text: 'Your',
		className:
			'mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900',
	},
	{
		text: ' Health,',
		className:
			'mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900',
	},
	{
		text: 'One',
		className:
			'mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900',
	},
	{
		text: 'Vault.',
		className:
			'mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-blue-500',
	},
];

const Hero = () => {
	return (
		<section id="hero" className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
			<div className="container mx-auto">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div className="text-left">
						<div className="inline-block animate-fade-in">
							<span className="px-3 py-1 text-sm font-medium text-gray-400 rounded-full">
								Secure Healthcare Platform
							</span>
						</div>
						<TypewriterEffectSmooth words={words} />
						<p
							className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl"
							style={{ animationDelay: '0.1s' }}
						>
							Centralize and manage your medical records
							effortlessly while ensuring top-notch privacy and
							security. Access your health data anytime, anywhere.
						</p>
						<div
							className="mt-10 flex flex-col sm:flex-row gap-4"
							style={{ animationDelay: '0.2s' }}
						>
							<Button
								as={Link}
								href="/signup"
								size="lg"
								variant="ghost"
								className="group"
							>
								Get Early Access
								<ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
							</Button>
						</div>
					</div>
					<div
						className="relative animate-fade-in"
						style={{ animationDelay: '0.3s' }}
					>
						<img
							src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
							alt="HealthVault Dashboard"
							className="rounded-2xl shadow-2xl"
						/>
						<div className="absolute -bottom-6 -right-6 -z-10 w-full h-full bg-accent/10 rounded-2xl"></div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Hero;
