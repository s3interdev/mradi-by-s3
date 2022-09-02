const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');

/** mongoose models */
const Project = require('../models/Project');
const Client = require('../models/Client');

/** sample data
 *  const { projects, clients } = require('../data/sampleData.js');
 */

/** project type */
const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return Client.findById(parent.clientId);
			},
		},
	}),
});

/** client type */
const ClientType = new GraphQLObjectType({
	name: 'Client',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	}),
});

/** root queries */
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Project.findById(args.id);
			},
		},
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return Project.find();
			},
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Client.findById(args.id);
			},
		},
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				return Client.find();
			},
		},
	},
});

/** mutations */
const mutation = new GraphQLObjectType({
	name: 'mutation',
	fields: {
		/** add client */
		addClient: {
			type: ClientType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				email: { type: GraphQLNonNull(GraphQLString) },
				phone: { type: GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const client = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone,
				});

				return client.save();
			},
		},

		/** delete client */
		deleteClient: {
			type: ClientType,
			args: { id: { type: GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				Project.find({ clientId: args.id }).then((projects) => {
					projects.forEach((project) => {
						project.remove();
					});
				});

				return Client.findByIdAndRemove(args.id);
			},
		},

		/** add project */
		addProject: {
			type: ProjectType,
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLNonNull(GraphQLString) },
				status: {
					type: new GraphQLEnumType({
						name: 'ProjectStatus',
						values: {
							new: { value: 'Not Started' },
							progress: { value: 'Active' },
							complete: { value: 'Complete' },
						},
					}),
					defaultValue: 'Not Started',
				},
				clientId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const project = new Project({
					name: args.name,
					description: args.description,
					status: args.status,
					clientId: args.clientId,
				});

				return project.save();
			},
		},

		/** delete project */
		deleteProject: {
			type: ProjectType,
			args: { id: { type: GraphQLNonNull(GraphQLID) } },
			resolve(parent, args) {
				return Project.findByIdAndRemove(args.id);
			},
		},

		/** update project */
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				name: { type: GraphQLString },
				description: { type: GraphQLString },
				status: {
					type: new GraphQLEnumType({
						name: 'ProjectStatusUpdate',
						values: {
							new: { value: 'Not Started' },
							progress: { value: 'Active' },
							complete: { value: 'Complete' },
						},
					}),
				},
			},
			resolve(parent, args) {
				return Project.findByIdAndUpdate(
					args.id,
					{
						$set: {
							name: args.name,
							description: args.description,
							status: args.status,
						},
					},
					{ new: true }
				);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: mutation,
});
