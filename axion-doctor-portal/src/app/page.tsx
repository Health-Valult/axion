'use client';

import RecentPatients from './elements/RecentPatients';
import SearchBar from './components/SearchBar';
import { Notes } from '@/components/ui/notes';
import { Files, FileText, Link } from 'lucide-react';
import { TextEffect } from '@/components/ui/text-effect';
import ProtectedClientComponent from './components/ProtectedClientComponent';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const page: React.FC = async () => {
	const user = useSelector((state: RootState) => state.user.state);
	return (
		<ProtectedClientComponent>
			<div className="p-4 flex flex-col flex-1 bg-white dark:bg-black rounded-l-sm h-full overflow-y-auto">
				<TextEffect
					per="word"
					className="text-3xl"
					as="h3"
					preset="slide"
				>
					{`Welcome Dr. ${user?.fullName ?? 'Guest'}`}
				</TextEffect>
				<div className="flex flex-1 items-center gap-x-4 px-16 py-8">
					<div className="flex-1">
						<SearchBar />
					</div>
					<div className="flex-1">
						<Notes
							title="No Notes Yet"
							description="You can create a new note."
							icons={[FileText, Link, Files]}
						/>
					</div>
				</div>

				<div className="flex-1 mt-4">
					<RecentPatients />
				</div>
			</div>
		</ProtectedClientComponent>
	);
};

export default page;
