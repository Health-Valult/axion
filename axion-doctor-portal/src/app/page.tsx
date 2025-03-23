import RecentPatients from './elements/RecentPatients';
import SearchBar from './components/SearchBar';
import { Notes } from '@/components/ui/notes';
import { requireAuth } from './lib/auth';
import Welcome from './elements/Welcome';

const Home: React.FC = async () => {
	await requireAuth();
	return (
		<div className="p-4 flex flex-col flex-1 bg-white dark:bg-black rounded-l-sm h-full overflow-y-auto">
			<Welcome />

			{/* This container changes from row to column on small screens */}
			<div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-x-4 px-4 md:px-16 py-4 md:py-8">
				<div className="w-full md:flex-1">
					<SearchBar />
				</div>
				<div className="w-full md:flex-1 mt-4 md:mt-0">
					<Notes
						title="No Notes Yet"
						description="You can create a new note."
					/>
				</div>
			</div>

			<div className="flex-1 mt-4">
				<RecentPatients />
			</div>
		</div>
	);
};

export default Home;
