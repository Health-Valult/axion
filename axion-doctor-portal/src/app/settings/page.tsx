/* eslint-disable */
'use client';

import { useEffect, useState } from 'react';
import {
	Avatar,
	Chip,
	Button,
	Card,
	DropdownTrigger,
	Divider,
} from '@heroui/react';
import { Dropdown, DropdownMenu, DropdownItem } from '@heroui/react';
import { Clock, Mail, MapPin, Moon, Phone, Sun } from 'lucide-react';

import { motion } from 'framer-motion';
import { CardContent } from '@/components/ui/card2';
import { EducationTimeline } from '@/profile/Qualifications';
import EditProfileDialog from '../components/EditProfile';
import ProtectedClientComponent from '../components/ProtectedClientComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type Theme = 'light' | 'dark';

const EditProfilePage: React.FC = () => {
	const [theme, setTheme] = useState<Theme>(() => {
		// Move localStorage access to a lazy initializer function for useState
		if (typeof window !== 'undefined') {
			return JSON.parse(
				localStorage.getItem('theme') || '"light"'
			) as Theme;
		}
		return 'light';
	});

	const user = useSelector((state: RootState) => state.user.state);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', JSON.stringify(theme));
			if (theme === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}, [theme]);

	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

	if (!user) {
		return (
			<div className="text-center my-auto font-bold text-2xl">
				Log in to view profile
			</div>
		);
	}

	return (
		<ProtectedClientComponent>
			<section>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Card className="border-none shadow-none dark:bg-card/50 bg-white/90 backdrop-blur-sm">
						<CardContent className="p-6 md:p-8">
							<div className="flex flex-col items-center md:flex-row md:items-start gap-6">
								<motion.div
									whileHover={{ scale: 1.05 }}
									transition={{
										type: 'spring',
										stiffness: 300,
									}}
								>
									<Avatar
										className="h-32 w-32 md:h-40 md:w-40 border-4 border-primary/10 shadow-lg"
										src="/images/doctor.png"
									/>
								</motion.div>

								<div className="flex-1 text-center md:text-left">
									<h1 className="text-3xl md:text-4xl font-bold font-montserrat mb-2">
										{user.fullName}
									</h1>
									<div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
										<Chip
											color="primary"
											variant="bordered"
											className="text-sm py-1 px-3"
										>
											{user.specialisation}
										</Chip>
										<Chip
											color="primary"
											variant="solid"
											className="text-sm py-1 px-3"
										>
											{user.yearsOfExperience}+ years
										</Chip>
									</div>

									<p className="text-muted-foreground mb-4">
										{user.workingHospital}
									</p>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
										<div className="flex items-center gap-2">
											<Mail className="h-4 w-4 text-primary" />
											<span>{user.email}</span>
										</div>
										<div className="flex items-center gap-2">
											<Phone className="h-4 w-4 text-primary" />
											<span>{user.phone}</span>
										</div>
										<div className="flex items-center gap-2">
											<Clock className="h-4 w-4 text-primary" />
											<span>{user.officeHours}</span>
										</div>
										<div className="flex items-center gap-2">
											<MapPin className="h-4 w-4 text-primary" />
											<span>{user.location}</span>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				<EducationTimeline qualifications={user.qualifications} />

				<div className="flex items-center justify-center">
					<Button
						variant="bordered"
						className="text-center"
						onPress={() => setIsEditDialogOpen(true)}
					>
						Change Password
					</Button>
				</div>

				<EditProfileDialog
					open={isEditDialogOpen}
					onOpenChange={setIsEditDialogOpen}
				/>

				<Divider className="my-8" />

				{/* Theme Selector */}
				<div className="w-full flex items-center justify-center mt-6">
					<div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800/50 p-2 px-4 rounded-full shadow-md backdrop-blur-md">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							Theme
						</span>
						<Dropdown>
							<DropdownTrigger>
								<Button
									variant="ghost"
									className="flex items-center gap-2 px-4 py-2 border dark:border-gray-600 rounded-full shadow"
								>
									{theme === 'light' ? (
										<Sun className="h-5 w-5 text-yellow-500" />
									) : (
										<Moon className="h-5 w-5 text-blue-400" />
									)}
									<span className="capitalize text-sm font-medium">
										{theme}
									</span>
								</Button>
							</DropdownTrigger>
							<DropdownMenu className="items-center align-middle bg-white dark:bg-gray-900/80 backdrop-blur-md shadow-xl rounded-lg border dark:border-gray-700">
								<DropdownItem
									key="light"
									onPress={() => setTheme('light')}
								>
									<div className="flex items-center">
										<Sun size={18} className="mr-3" />{' '}
										<span className="text-md font-semibold ">
											Light
										</span>
									</div>
								</DropdownItem>
								<DropdownItem
									key="dark"
									onPress={() => setTheme('dark')}
								>
									<div className="flex items-center">
										<Moon size={18} className="mr-3" />
										<span className="text-md font-semibold ">
											Dark
										</span>
									</div>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</div>
			</section>
		</ProtectedClientComponent>
	);
};

export default EditProfilePage;
