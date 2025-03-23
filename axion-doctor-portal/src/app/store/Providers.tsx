// import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
// import { usePathname, useRouter } from 'next/navigation';
import { store } from './store';
import client from '@/lib/apolloClient';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';

// Main Providers component that wraps everything
const Providers = ({ children }: { children: React.ReactNode }) => {
	console.log('Providers component rendering');
	useTokenRefresh();
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>{children}</Provider>
		</ApolloProvider>
	);
};

export default Providers;
