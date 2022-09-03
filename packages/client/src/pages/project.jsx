import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
import { GET_PROJECT } from '../graphql/queries/project-queries';
import ClientInfo from '../components/client-info';
import EditProjectForm from '../components/edit-project-form';
import DeleteProjectButton from '../components/delete-project-button';
import Spinner from '../components/spinner';

const Project = () => {
	const { id } = useParams();
	const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

	if (loading) return <Spinner />;

	if (error) return <p>Something went wrong retrieving project data...</p>;

	return (
		<>
			{!loading && !error && (
				<div className="w-75 card mx-auto p-5 mb-5">
					<Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
						Back
					</Link>

					<h1>{data.project.name}</h1>
					<p>{data.project.description}</p>

					<h5 className="mt-3">Project Status</h5>
					<p className="lead">{data.project.status}</p>

					<ClientInfo client={data.project.client} />

					<EditProjectForm project={data.project} />

					<DeleteProjectButton projectId={data.project.id} />
				</div>
			)}
		</>
	);
};

export default Project;
