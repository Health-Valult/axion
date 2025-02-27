'use client';

import RecentPatients from './elements/RecentPatients';
import SearchBar from './components/SearchBar';
import { EmptyStateDefault } from '@/components/ui/calendar';

const page: React.FC = () => {
	return (
		<div className="p-4 flex flex-col flex-1 bg-white dark:bg-black rounded-l-sm h-full overflow-y-auto">
			<div className="flex flex-1 items-center gap-x-4 px-16 py-8">
				<div className="flex-1">
					<SearchBar />
				</div>
				<div className="flex-1">
					<EmptyStateDefault />
				</div>
			</div>

			<div className="flex-1 mt-4">
				<RecentPatients />
			</div>
		</div>
	);
};

export default page;
