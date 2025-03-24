// import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
// import { usePathname, useRouter } from 'next/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/app/store/store';
import client from '@/lib/apolloClient';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';

// Main Providers component that wraps everything
const Providers = ({ children }: { children: React.ReactNode }) => {
	console.log('Providers component rendering');
	useTokenRefresh();
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{children}
				</PersistGate>
			</Provider>
		</ApolloProvider>
	);
};

export default Providers;
