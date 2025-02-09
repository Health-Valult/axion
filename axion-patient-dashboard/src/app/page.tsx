'use client';

import AppointmentScheduler from './components/AppointmentScheduler';
import SearchBar from './elements/SearchBar';

const page: React.FC = () => {
	return (
		<div className="p-4 flex flex-1 bg-white rounded-l-sm h-full overflow-y-auto gap-x-8">
			<SearchBar />
			<AppointmentScheduler />
		</div>
	);
};

export default page;
