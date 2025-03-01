'use client';

import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { store } from './store';
import client from '@/lib/apolloClient';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>{children}</Provider>
		</ApolloProvider>
	);
};

export default Providers;
