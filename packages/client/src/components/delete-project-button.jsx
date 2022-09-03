import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { DELETE_PROJECT } from '../graphql/mutations/project-mutations';
import { GET_PROJECTS } from '../graphql/queries/project-queries';

const DeleteProjectButton = ({ projectId }) => {
	const navigate = useNavigate();

	const [deleteProject] = useMutation(DELETE_PROJECT, {
		variables: { id: projectId },
		onCompleted: () => navigate('/'),
		refetchQueries: [{ query: GET_PROJECTS }],
	});

	return (
		<div className="d-flex ms-auto mt-5">
			<button className="btn btn-danger m-2" onClick={deleteProject}>
				<FaTrash className="icon" /> Delete Project
			</button>
		</div>
	);
};

export default DeleteProjectButton;
