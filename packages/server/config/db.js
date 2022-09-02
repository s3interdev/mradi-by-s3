const mongoose = require('mongoose');

const connectDB = async () => {
	const db = await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	console.log(`Connected to MongoDB Host: ${db.connection.host}`.cyan.bold);
};

module.exports = connectDB;
