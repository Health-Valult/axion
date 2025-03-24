import { DoctorSignup } from '@/components/ui/signup';
import ThemeSwitcher from '@/components/ui/theme-switch';
import React from 'react';

const SignUp: React.FC = () => {
	return (
		<div>
			<ThemeSwitcher />
			<DoctorSignup />
		</div>
	);
};

export default SignUp;
