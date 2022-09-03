import { ApolloClient, InMemoryCache } from '@apollo/client';

/** configure the apollo client */
const client = new ApolloClient({
	url:
		process.env.NODE_ENV === 'production'
			? 'https://mradi-be.s3.co.ke/graphql'
			: 'http://localhost:5000/graphql',
	cache: new InMemoryCache(),
});

export default client;
