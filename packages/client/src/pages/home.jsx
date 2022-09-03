import Clients from '../components/clients';
import Projects from '../components/projects';
import AddClientModal from '../components/add-client-modal';
import AddProjectModal from '../components/add-project-modal';

const Home = () => {
	return (
		<>
			<div className="d-flex mb-4 gap-3">
				<AddClientModal />
				<AddProjectModal />
			</div>
			<Projects />
			<hr />
			<Clients />
		</>
	);
};

export default Home;
