const mongoose = require('mongoose');

const connectDB = async () => {
	/** connect to MongoDB Atlas
	 *
	 * const db = await mongoose.connect('mongodb+srv://<username>:<password>@<host>/<database>?retryWrites=true&w=majority', {
	 * useNewUrlParser: true,
	 * useUnifiedTopology: true,
	 * });
	 *
	 */

	/** connect to HifadhiDB standalone server
	 *
	 * const db = await mongoose.connect('mongodb://<username>:<password>@<host>/<database>?authSource=admin')
	 *
	 */

	const db = await mongoose.connect(process.env.MONGODB_URI);

	console.log(`Connected to MongoDB at ${db.connection.host}`.cyan.bold);
};

module.exports = connectDB;
