import { MongoClient, ServerApiVersion } from "mongodb";
const connStr = "mongodb+srv://me:jwpgbKosHKrpFWMO@cluster.7kg8u7e.mongodb.net/?retryWrites=true&w=majority";

async function connectToDB() {
	const client = new MongoClient(connStr, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		}
	});
	await client.connect();
	return client;
}

export { connectToDB };
