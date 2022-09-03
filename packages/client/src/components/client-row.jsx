import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../graphql/mutations/client-mutations';
import { GET_CLIENTS } from '../graphql/queries/client-queries';
import { GET_PROJECTS } from '../graphql/queries/project-queries';

const ClientRow = ({ client }) => {
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id: client.id },
		/** refetch queries for smaller applications
		 * refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
		 */

		/** read queries from the cache for larger applications */
		update(cache, { data: { deleteClient } }) {
			const { clients } = cache.readQuery({ query: GET_CLIENTS });
			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: clients.filter((client) => client.id !== deleteClient.id) },
			});
		},
	});

	return (
		<tr>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button className="btn btn-danger btn-sm" onClick={deleteClient}>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
};

export default ClientRow;
