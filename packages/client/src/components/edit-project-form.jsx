import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT } from '../graphql/mutations/project-mutations';
import { GET_PROJECT } from '../graphql/queries/project-queries';

const EditProjectForm = ({ project }) => {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [status, setStatus] = useState(() => {
		switch (project.status) {
			case 'Not Started':
				return 'new';
			case 'Active':
				return 'progress';
			case 'Progress':
				return 'complete';
			default:
				throw new Error(`Unknown status: ${project.status}`);
		}
	});

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id: project.id, name, description, status },
		refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
	});

	const onSubmit = (e) => {
		e.preventDefault();

		if (!name || !description || !status) {
			return alert('Please fill out all fields');
		}

		updateProject(name, description, status);
	};

	return (
		<div className="mt-5">
			<h3>Update Project Details</h3>
			<form onSubmit={onSubmit}>
				<div className="mb-3">
					<label className="form-label">Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="mb-3">
					<label className="form-label">Description</label>
					<textarea
						className="form-control"
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>
				<div className="mb-3">
					<label className="form-label">Status</label>
					<select
						id="status"
						className="form-select"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="new">Not Started</option>
						<option value="progress">Active</option>
						<option value="complete">Complete</option>
					</select>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
};

export default EditProjectForm;
