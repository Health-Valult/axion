'use client';

import { Card } from '@/components/ui/card2';
import { motion } from 'framer-motion';

const recentPatients = [
	{
		name: 'John Doe',
		nic: '123456789V',
	},
	{
		name: 'Jane Smith',
		nic: '987654321V',
	},
	{
		name: 'Robert Johnson',
		nic: '456789123V',
	},
	{
		name: 'Emily Davis',
		nic: '654321987V',
	},
	{
		name: 'Michael Lee',
		nic: '789123456V',
	},
	{
		name: 'John Park',
		nic: '321987654V',
	},
];

const RecentPatients = () => {
	return (
		<div className="bg-white dark:bg-black text-center">
			<span className="font-bold items-center justify-center mx-auto">
				Recent Patient Checkups
			</span>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
				{recentPatients.map((patient, index) => (
					<motion.div
						key={index}
						whileHover={{
							scale: 1.05,
							boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
						}}
						transition={{ duration: 0.3 }}
						className="rounded-lg shadow-md overflow-hidden bg-white dark:bg-black"
					>
						<motion.div
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.3 }}
							className="rounded-lg overflow-hidden"
						>
							<Card
								variant="neubrutalism"
								title={patient.name}
								description={patient.nic}
								className="rounded-lg shadow-md bg-white dark:bg-black dark:text-white dark:border-gray-600"
							></Card>
						</motion.div>
					</motion.div>
				))}
			</div>
		</div>
	);
};

export default RecentPatients;
