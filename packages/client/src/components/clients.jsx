import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from '../graphql/queries/client-queries';
import ClientRow from './client-row';
import Spinner from './spinner';

const Clients = () => {
	const { loading, error, data } = useQuery(GET_CLIENTS);

	if (loading) return <Spinner />;

	if (error) return <p>Something went wrong retrieving clients' data...</p>;

	return (
		<>
			{!loading && !error && (
				<table className="table-hover mt-3 table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.clients.map((client) => (
							<ClientRow key={client.id} client={client} />
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

export default Clients;
