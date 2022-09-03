import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import Project from './pages/project';
import NotFound from './pages/not-found';

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				projects: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

const client = new ApolloClient({
	uri:
		process.env.NODE_ENV === 'production'
			? 'https://mradi-be.s3.co.ke/graphql'
			: 'http://localhost:5000/graphql',
	cache: cache,
});

const App = () => {
	return (
		<>
			<ApolloProvider client={client}>
				<Router>
					<Header />
					<div className="container">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/projects/:id" element={<Project />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</div>
				</Router>
			</ApolloProvider>
		</>
	);
};

export default App;
