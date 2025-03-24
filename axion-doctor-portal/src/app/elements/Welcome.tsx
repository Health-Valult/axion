'use client';
import { useSelector } from 'react-redux';
import React from 'react';
import { TextEffect } from '@/components/ui/text-effect';
import { RootState } from '../store/store';

const Welcome: React.FC = () => {
	const user = useSelector((state: RootState) => state.user.state);
	return (
		<TextEffect per="word" className="text-3xl" as="h3" preset="slide">
			{`Welcome ${user?.fullName ?? 'Guest'}`}
		</TextEffect>
	);
};

export default Welcome;
