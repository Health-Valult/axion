import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getTokensFromCookies } from '@/app/utils/auth'; // Adjust import path as needed

// Create the HTTP link
const httpLink = createHttpLink({
	uri: 'http://localhost:3000/api/graphql', // Adjust URL as needed
});

// Create the auth link to add the Authorization header
const authLink = setContext(async (_, { headers }) => {
	// Get session token
	let sessionToken = null;

	try {
		// Try to get token from cookies using our utility function
		const { sessionToken: token } = await getTokensFromCookies();
		sessionToken = token;
	} catch (error) {
		console.error('Failed to get session token:', error);
		// Continue without token if there's an error
	}

	// Return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: sessionToken ? `Bearer ${sessionToken}` : '',
		},
	};
});

// Create the Apollo Client with the auth link and HTTP link
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			errorPolicy: 'all',
		},
		query: {
			errorPolicy: 'all',
		},
	},
});

export default client;
