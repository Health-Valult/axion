'use client';

import { Calendar } from '@heroui/react';
import RecentPatients from './elements/RecentPatients';
import SearchBar from './elements/SearchBar';
import { today, getLocalTimeZone } from '@internationalized/date';

const page: React.FC = () => {
	return (
		<div className="p-4 flex flex-col flex-1 bg-white rounded-l-sm h-full overflow-y-auto">
			<div className="flex flex-1 gap-x-8">
				<div className="flex-1 ml-20 mt-15">
					<SearchBar />
				</div>
				<div className="flex-1 mr-15">
					<Calendar
						aria-label="Date (Visible Month)"
						visibleMonths={3}
						value={today(getLocalTimeZone())}
					/>
				</div>
			</div>

			<div className="flex-1 mt-4">
				<RecentPatients />
			</div>
		</div>
	);
};

export default page;
