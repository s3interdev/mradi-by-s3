const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');

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
			resolve(parent, args) {},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: mutation,
});
